const Cart = require('../models/cartModel');
const handlerFactory = require('./handlerFactory');

exports.create = handlerFactory.createOne(Cart);

exports.getAll = handlerFactory.getAll(Cart, { path: 'product' });

exports.updateOne = handlerFactory.updateOne(Cart, { path: 'product' });

exports.deleteOne = handlerFactory.deleteOne(Cart);
