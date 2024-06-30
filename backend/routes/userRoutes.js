const router = require('express').Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;
