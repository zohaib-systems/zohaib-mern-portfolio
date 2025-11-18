const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Get orders for authenticated user
router.get('/', auth, async (req, res, next) => {
  try {
    const orders = await Order.find({ client: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
});

// Create an order
router.post('/', auth, async (req, res, next) => {
  try {
    const data = req.body;
    data.client = req.user.id;
    const order = await Order.create(data);
    res.status(201).json(order);
  } catch (err) { next(err); }
});

// Update order (status or fields)
router.put('/:id', auth, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(order);
  } catch (err) { next(err); }
});

module.exports = router;