const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: 'category',
    required: [true, 'A product must have a category.'],
  },
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
  },
  image: String,
  description: {
    type: String,
    required: [true, 'A product must have a description.'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
  },
  stock: {
    type: Number,
    required: [true, 'A product must have stock.'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    select: false,
    default: Date.now(),
  },
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
