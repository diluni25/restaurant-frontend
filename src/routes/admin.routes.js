import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/prisma.js';
import verifyToken from '../middleware/auth.middleware.js';
const router = Router();

// ==========================================
// 1. ADMIN LOGIN API
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    return res.status(503).json({ message: 'JWT_SECRET must be configured securely' });
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Check if the admin exists in the database using Prisma
    const admin = await prisma.adminUser.findUnique({
      where: { email }
    });

    if (!admin || !admin.isActive) {
      return res.status(404).json({ message: "Admin not found with this email!" });
    }

    // Verify password by comparing plain input password with hashed database password
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Generate JWT token valid for 1 day
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send successful response with token and admin details
    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// ==========================================
// 2. PROTECTED ROUTE EXAMPLE (Authorization)
// ==========================================
// Only authenticated admins with a valid token can access this route
router.get('/dashboard', verifyToken, async (req, res, next) => {
  try {
    const [
      menuItems,
      availableMenuItems,
      categories,
      chefs,
      activeChefs,
      orders,
      pendingOrders,
      reservations,
      inquiries,
      revenue,
      recentOrders
    ] = await Promise.all([
      prisma.menuItem.count(),
      prisma.menuItem.count({ where: { isAvailable: true } }),
      prisma.menuCategory.count(),
      prisma.chef.count(),
      prisma.chef.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: { in: ['PENDING', 'CONFIRMED', 'PREPARING', 'READY'] } } }),
      prisma.reservation.count(),
      prisma.inquiry.count({ where: { status: { in: ['NEW', 'IN_PROGRESS'] } } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }),
      prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { items: true } })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        admin: req.admin,
        statistics: {
          menuItems,
          availableMenuItems,
          categories,
          chefs,
          activeChefs,
          orders,
          pendingOrders,
          reservations,
          inquiries,
          revenue: Number(revenue._sum.total ?? 0).toFixed(2)
        },
        recentOrders
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;