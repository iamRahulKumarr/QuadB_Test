const Product = require('../models/productModel');
const handlerFactory = require('./handlerFactory');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.create = handlerFactory.createOne(Product);

exports.getAll = handlerFactory.getAll(Product);

exports.getOne = handlerFactory.getOne(Product);

exports.updateOne = handlerFactory.updateOne(Product);

exports.deleteOne = handlerFactory.deleteOne(Product);
