const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gig: { type: String },
  items: [orderItemSchema],
  price: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  status: { type: String, enum: ['pending','paid','in progress','review','completed','cancelled'], default: 'pending' },
  requirements: String,
  deliverables: [String],
  deadline: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);