import { Router } from 'express';
import { prisma } from '../config/prisma.js';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { uploadChefImage, uploadedChefPath } from '../services/image.service.js';

const router = Router();
const fields = ['name', 'title', 'bio', 'sortOrder', 'isActive'];
router.use(requireAdmin);

function validImageUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) return false;
  if (/^\/uploads\/chefs\/[a-f0-9-]+\.(jpg|png|webp)$/i.test(value)) return true;
  try {
    return ['http:', 'https:'].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

function validateChef(body, partial = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return 'A JSON object is required';
  const allowed = [...fields, 'imageUrl'];
  if (Object.keys(body).some((key) => !allowed.includes(key))) return 'Request contains unsupported fields';

  for (const field of ['name', 'title', 'bio']) {
    if (body[field] === undefined && partial) continue;
    if (typeof body[field] !== 'string' || !body[field].trim()) return `${field} must be a non-empty string`;
  }
  if (body.name?.length > 120 || body.title?.length > 120) return 'name and title must be at most 120 characters';
  if (body.sortOrder !== undefined && (!Number.isInteger(body.sortOrder) || body.sortOrder < 0)) return 'sortOrder must be a non-negative integer';
  if (body.isActive !== undefined && typeof body.isActive !== 'boolean') return 'isActive must be a boolean';
  if (body.imageUrl !== undefined && body.imageUrl !== null && !validImageUrl(body.imageUrl)) return 'imageUrl must be an HTTP or HTTPS URL';
  return null;
}

router.get('/', async (_req, res, next) => {
  try {
    const chefs = await prisma.chef.findMany({ orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }] });
    res.json({ success: true, data: chefs });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const validationError = validateChef(req.body);
  if (validationError) return res.status(400).json({ success: false, message: validationError });
  try {
    const chef = await prisma.chef.create({ data: req.body });
    res.status(201).json({ success: true, data: chef });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const chef = await prisma.chef.findUnique({ where: { id: req.params.id } });
    if (!chef) return res.status(404).json({ success: false, message: 'Chef not found' });
    res.json({ success: true, data: chef });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const validationError = validateChef(req.body, true);
  if (validationError) return res.status(400).json({ success: false, message: validationError });
  if (Object.keys(req.body).length === 0) return res.status(400).json({ success: false, message: 'At least one field is required' });
  try {
    const chef = await prisma.chef.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: chef });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Chef not found' });
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await prisma.chef.delete({ where: { id: req.params.id } });
    res.status(204).end();
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Chef not found' });
    next(error);
  }
});

router.get('/:id/image', async (req, res, next) => {
  try {
    const chef = await prisma.chef.findUnique({ where: { id: req.params.id }, select: { imageUrl: true } });
    if (!chef) return res.status(404).json({ success: false, message: 'Chef not found' });
    res.json({ success: true, data: { imageUrl: chef.imageUrl } });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/image', uploadChefImage, async (req, res, next) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Image file required' });
  try {
    const imageUrl = uploadedChefPath(req.file);
    const chef = await prisma.chef.update({ where: { id: req.params.id }, data: { imageUrl } });
    res.status(201).json({ success: true, data: { imageUrl: chef.imageUrl } });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Chef not found' });
    next(error);
  }
});

router.put('/:id/image', async (req, res, next) => {
  if (!req.body || !validImageUrl(req.body.imageUrl)) {
    return res.status(400).json({ success: false, message: 'imageUrl must be an HTTP or HTTPS URL' });
  }
  try {
    const chef = await prisma.chef.update({ where: { id: req.params.id }, data: { imageUrl: req.body.imageUrl } });
    res.json({ success: true, data: { imageUrl: chef.imageUrl } });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Chef not found' });
    next(error);
  }
});

router.delete('/:id/image', async (req, res, next) => {
  try {
    const chef = await prisma.chef.update({ where: { id: req.params.id }, data: { imageUrl: null } });
    res.json({ success: true, data: { imageUrl: chef.imageUrl } });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ success: false, message: 'Chef not found' });
    next(error);
  }
});

export default router;