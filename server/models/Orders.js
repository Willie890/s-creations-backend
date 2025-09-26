// server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    size: String,
    qty: { type: Number, default: 1 },
    price: Number
  }],
  delivery: String,
  payment: String,
  status: { type: String, default: 'processing' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
