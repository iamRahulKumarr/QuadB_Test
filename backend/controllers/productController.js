const multer = require('multer');

const Product = require('../models/productModel');
const handlerFactory = require('./handlerFactory');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/products');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.fieldname + '-' + file.originalname);
//   },
// });

// const productUpload = multer({ storage: productStorage });

// exports.uploadProductPhoto = productUpload.array('photo', 2);

// exports.setProductPhoto = (req, res, next) => {
//   if (req.files) {
//     req.body.photo = req.files.map((photo) => 'products/' + photo.filename);
//   }
//   next();
// };
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/products');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + '-' + file.originalname);
  },
});

const productUpload = multer({ storage: productStorage });

exports.uploadProductPhoto = productUpload.single('photo');

exports.setProductPhoto = (req, res, next) => {
  if (req.file) {
    req.body.photo = 'products/' + req.file.filename;
  }
  next();
};

exports.create = handlerFactory.createOne(Product);

exports.getAll = handlerFactory.getAll(Product);

exports.getOne = handlerFactory.getOne(Product);

exports.updateOne = handlerFactory.updateOne(Product);

exports.deleteOne = handlerFactory.deleteOne(Product);
