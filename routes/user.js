const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const userAuthenticate = require('../middleware/auth');

router.post('/user/signup', userController.addUser);
router.post('/user/login', userController.login);
router.post('/user/changePasswword',userAuthenticate.authenticate,userController.changePassword)

module.exports = router;