const router = require('express').Router();

const categoryController = require('../controllers/categoryController');

router
  .route('/')
  .get(categoryController.getAll)
  .post(
    categoryController.addCategoryPhoto,
    categoryController.setFilename,
    categoryController.create
  );

router.route('/:id').get(categoryController.getOne);

module.exports = router;
