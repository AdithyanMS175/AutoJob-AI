const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController')

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)


module.exports = router