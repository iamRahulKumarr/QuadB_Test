const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username.'],
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'A user must have an email.'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    select: false,
    minlength: 8,
    required: [true, 'A user must have a password'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'A user must confirm password.'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
  userType: {
    type: String,
    enum: {
      values: ['admin', 'customer'],
      message: 'A user can only be admin or customer.',
    },
    required: [true, 'A user must have a userType.'],
    default: 'customer',
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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('user', userSchema);

module.exports = User;
