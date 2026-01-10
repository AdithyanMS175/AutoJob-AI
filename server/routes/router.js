const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const multerMiddleware = require('../middlewares/multerMiddlewares');

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)

//user edit
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)

module.exports = router