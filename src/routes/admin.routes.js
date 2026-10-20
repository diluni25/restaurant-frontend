const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth.middleware');

// ==========================================
// 1. ADMIN LOGIN API
// ==========================================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists in the database using Prisma
    const admin = await prisma.admin.findUnique({
      where: { email }
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found with this email!" });
    }

    // Verify password by comparing plain input password with hashed database password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Generate JWT token valid for 1 day
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'super_secret_key',
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
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    return res.status(200).json({
      message: "Welcome to the protected admin dashboard!",
      admin: req.admin // Contains the decoded token payload
    });
  } catch (error) {
    return res.status(500).json({ message: "Error loading dashboard", error: error.message });
  }
});

module.exports = router;