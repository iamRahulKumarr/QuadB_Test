const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'A category must only have gender: male or female.',
    },
    required: [true, 'A category must have a gender.'],
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
