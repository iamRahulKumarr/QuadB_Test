const Category = require('../models/categoryModel');
const handlerFactory = require('./handlerFactory');
const multer = require('multer');

const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/categories');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.fieldname + '-' + file.originalname);
  },
});

const categoryUpload = multer({ storage: categoryStorage });

exports.addCategoryPhoto = categoryUpload.single('photo');

exports.setFilename = (req, res, next) => {
  if (req.file) {
    req.body.photo = 'categories/' + req.file.filename;
  }
  next();
};

exports.create = handlerFactory.createOne(Category);

exports.getAll = handlerFactory.getAll(Category);

exports.getOne = handlerFactory.getOne(Category);
