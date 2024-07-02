const router = require('express').Router();

const authController = require('../controllers/authController');
const productController = require('../controllers/productController');

router
  .route('/')
  .get(productController.getAll)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.uploadProductPhoto,
    productController.setProductPhoto,
    productController.create
  );

router
  .route('/:id')
  .get(productController.getOne)
  .put(productController.updateOne)
  .delete(productController.deleteOne);

module.exports = router;
