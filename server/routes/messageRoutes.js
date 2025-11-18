const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// Get recent messages (public)
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(200);
    res.json(messages);
  } catch (err) { next(err); }
});

// Get messages for an order (optional)
router.get('/order/:orderId', async (req, res, next) => {
  try {
    const messages = await Message.find({ order: req.params.orderId }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) { next(err); }
});

// Create message (protected)
router.post('/', auth, async (req, res, next) => {
  try {
    const { text, order } = req.body;
    const msg = await Message.create({ text, order, senderId: req.user.id });
    res.status(201).json(msg);
  } catch (err) { next(err); }
});

module.exports = router;