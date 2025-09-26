// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String,
  sizes: [String],
  description: String,
  inStock: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', ProductSchema);
