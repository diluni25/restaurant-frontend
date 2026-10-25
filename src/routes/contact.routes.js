const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth.middleware');


// 1. SUBMIT CONTACT MESSAGE (Public / Customer)

router.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message
      }
    });

    return res.status(201).json({
      message: "Your message has been sent successfully!",
      data: newMessage
    });
  } catch (error) {
    console.error("Contact Form Error:", error);
    return res.status(500).json({ message: "Failed to send message", error: error.message });
  }
});


// 2. GET ALL CONTACT MESSAGES (Protected - Admin Only)

router.get('/all', verifyToken, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
});

module.exports = router;