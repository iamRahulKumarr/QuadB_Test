const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name.'],
  },
  photo: {
    type: String,
    required: [true, 'A category must have an image.'],
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

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
