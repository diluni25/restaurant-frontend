const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth.middleware'); 

// Get Home Content
router.get('/content', async (req, res) => {
  try {
    const content = await prisma.homeContent.findFirst();
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Home Content (Protected - Admin only)
router.put('/content', verifyToken, async (req, res) => {
  const { title, subtitle, description } = req.body;
  try {
    // Upsert ensures it creates if not exists, or updates if it does
    const updatedContent = await prisma.homeContent.upsert({
      where: { id: 1 },
      update: { title, subtitle, description },
      create: { title, subtitle, description },
    });
    res.status(200).json({ message: "Home content updated successfully", updatedContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;