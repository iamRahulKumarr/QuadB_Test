const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, 'A cart must have a user.'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'product',
    required: [true, 'A cart must have a product.'],
  },
  quantity: {
    type: Number,
    required: [true, 'A cart must have a quantity.'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
