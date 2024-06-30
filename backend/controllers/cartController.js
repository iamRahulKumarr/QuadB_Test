const Cart = require('../models/cartModel');
const handlerFactory = require('./handlerFactory');

exports.create = handlerFactory.createOne(Cart);

exports.getAll = handlerFactory.getAll(Cart);

exports.updateOne = handlerFactory.updateOne(Cart);

exports.deleteOne = handlerFactory.deleteOne(Cart);
