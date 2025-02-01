const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);
router.get('/user', userController.getUser);

module.exports = router;