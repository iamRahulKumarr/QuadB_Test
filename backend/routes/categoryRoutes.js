const router = require('express').Router();

const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');

router
  .route('/')
  .get(categoryController.getAll)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.addCategoryPhoto,
    categoryController.setFilename,
    categoryController.create
  );

router.route('/:id').get(categoryController.getOne);

module.exports = router;
