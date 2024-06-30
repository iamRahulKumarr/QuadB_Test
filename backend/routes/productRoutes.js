const router = require('express').Router();

const productController = require('../controllers/productController');

router.route('/').get(productController.getAll).post(productController.create);

router
  .route('/:id')
  .get(productController.getOne)
  .put(productController.updateOne)
  .delete(productController.deleteOne);

module.exports = router;
