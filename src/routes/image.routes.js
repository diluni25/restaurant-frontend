import { Router } from 'express';
import { requireAdmin } from '../middleware/admin.middleware.js';
import { asyncRoute, HttpError, validId } from '../utils/http.js';
import { uploadImage, uploadedPath, updateImage, deleteImage } from '../services/image.service.js';

const r = Router();

function imageUrlFrom(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'JSON object required');
  const value = body.imageUrl ?? body.image;
  if (typeof value !== 'string' || value.length > 2048 ||
    (!/^https?:\/\/[^\s]+$/i.test(value) && !/^\/uploads\/menu\/[a-f0-9-]+\.(jpg|png|webp)$/i.test(value))) {
    throw new HttpError(400, 'imageUrl must be a valid HTTP, HTTPS, or menu upload URL');
  }
  return value;
}

r.post('/upload', requireAdmin, uploadImage, asyncRoute(async (req, res) => {
  res.status(201).json({ success: true, data: { image: uploadedPath(req.file) } });
}));

r.patch('/menu/:id', requireAdmin, asyncRoute(async (req, res) => {
  const id = validId(req.params.id);
  const imageUrl = imageUrlFrom(req.body);
  res.json({ success: true, data: await updateImage(id, imageUrl) });
}));

r.delete('/menu/:id', requireAdmin, asyncRoute(async (req, res) => {
  const id = validId(req.params.id);
  res.json({ success: true, data: await deleteImage(id) });
}));

export default r;
