const router = require('express').Router();

const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

router
  .route('/')
  .post(authController.protect, cartController.create)
  .get(authController.protect, cartController.getAll);

router
  .route('/:id')
  .put(authController.protect, cartController.updateOne)
  .delete(authController.protect, cartController.deleteOne);

module.exports = router;
