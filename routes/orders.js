// server/routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// GET user orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new order
router.post('/', auth, async (req, res) => {
  try {
    const { delivery, payment } = req.body;
    const cart = []; // In real app: fetch from user session or cart collection

    // For demo: use placeholder
    const product = await Product.findOne();
    if (!product) return res.status(400).json({ message: 'No products' });

    const order = new Order({
      userId: req.user.id,
      items: [{ productId: product._id, size: 'One Size', qty: 1, price: product.price }],
      delivery,
      payment,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH update order (admin)
router.patch('/:id', auth, async (req, res) => {
  try {
    // In real app: verify admin
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
