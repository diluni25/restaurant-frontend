const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const verifyToken = require('../middleware/auth.middleware');

// 1. CHECKOUT & ORDER CREATE API (Public / Customer)

router.post('/create', async (req, res) => {
  const { customerName, customerEmail, customerPhone, address, totalAmount, items } = req.body;

  try {
    // Create new order with associated items using Prisma transaction
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        address,
        totalAmount,
        status: 'PENDING', // Default status for new orders
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    return res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({ message: "Failed to create order", error: error.message });
  }
});

// 2. ORDER STATUS MANAGEMENT API (Protected - Admin Only)

// Get all orders for Admin Dashboard
router.get('/all', verifyToken, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

// Update Order Status (e.g., PENDING -> PREPARING -> COMPLETED / CANCELLED)
router.patch('/:id/status', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expects new status in request body

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { status }
    });

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update order status", error: error.message });
  }
});

module.exports = router;