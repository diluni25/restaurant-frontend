const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth.middleware');

// Get About Content
router.get('/content', async (req, res) => {
  try {
    const about = await prisma.aboutContent.findFirst();
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update About Content (Protected)
router.put('/content', verifyToken, async (req, res) => {
  const { story, mission, vision } = req.body;
  try {
    const updatedAbout = await prisma.aboutContent.upsert({
      where: { id: 1 },
      update: { story, mission, vision },
      create: { story, mission, vision },
    });
    res.status(200).json({ message: "About content updated successfully", updatedAbout });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;