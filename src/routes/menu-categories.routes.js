import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/admin.middleware.js';

const router = Router();
const fields = ['name', 'slug', 'sortOrder', 'isActive'];

function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function validateCategory(body, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'A JSON object is required';
  if (Object.keys(body).some((key) => !fields.includes(key))) return 'Request contains unsupported fields';
  if (body.name === undefined && !partial) return 'name must be a non-empty string';
  if (body.name !== undefined && (typeof body.name !== 'string' || !body.name.trim() || body.name.length > 100)) {
    return 'name must be a non-empty string of at most 100 characters';
  }
  if (body.slug !== undefined && (typeof body.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug) || body.slug.length > 120)) {
    return 'slug must contain lowercase letters, numbers, and single hyphens';
  }
  if (body.sortOrder !== undefined && (!Number.isInteger(body.sortOrder) || body.sortOrder < 0)) return 'sortOrder must be a non-negative integer';
  if (body.isActive !== undefined && typeof body.isActive !== 'boolean') return 'isActive must be a boolean';
  return null;
}

function handleDatabaseError(error, res, next) {
  if (error.code === 'P2002') return res.status(409).json({ success: false, message: 'A category with that name or slug already exists' });
  if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Menu category not found' });
  if (error.code === 'P2003') return res.status(409).json({ success: false, message: 'Category is still referenced by menu items' });
  next(error);
}

router.get('/', async (_req, res, next) => {
  try {
    const categories = await prisma.menuCategory.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const validationError = validateCategory(req.body);
  if (validationError) return res.status(400).json({ success: false, message: validationError });
  try {
    const category = await prisma.menuCategory.create({ data: { ...req.body, slug: req.body.slug ?? slugify(req.body.name) } });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    handleDatabaseError(error, res, next);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await prisma.menuCategory.findUnique({ where: { id: req.params.id } });
    if (!category) return res.status(404).json({ success: false, message: 'Menu category not found' });
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
});

router.use(requireAdmin);

router.put('/:id', async (req, res, next) => {
  const validationError = validateCategory(req.body, true);
  if (validationError) return res.status(400).json({ success: false, message: validationError });
  if (Object.keys(req.body).length === 0) return res.status(400).json({ success: false, message: 'At least one field is required' });
  const data = { ...req.body };
  if (data.name !== undefined && data.slug === undefined) data.slug = slugify(data.name);
  try {
    const category = await prisma.menuCategory.update({ where: { id: req.params.id }, data });
    res.json({ success: true, data: category });
  } catch (error) {
    handleDatabaseError(error, res, next);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.menuCategory.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    handleDatabaseError(error, res, next);
  }
});

export default router;