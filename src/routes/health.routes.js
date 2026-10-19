import { Router } from 'express';
import { prisma } from '../config/prisma.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'tastoria-backend' });
});

router.get('/db', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('Database health check failed:', error.message);
    res.status(503).json({ status: 'error', database: 'unavailable' });
  }
});

export default router;
