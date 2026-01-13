const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const multerMiddleware = require('../middlewares/multerMiddlewares');
const resumeMulter = require('../middlewares/resumeMulter');
const jobController = require('../controllers/jobController');
const chatController  = require('../controllers/chatController');

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)

router.get("/user/:id",jwtMiddleware,userController.getUserController);

//user edit
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)

//user resume add
router.put("/user/:id/resume",jwtMiddleware,resumeMulter.single("resumes"),userController.userResumeUploadController);

//user job add
router.post("/user/add/job",jwtMiddleware,jobController.addJobController)

//user all jobs
router.get("/candidate/jobs",jwtMiddleware,jobController.userAllJobsController)


// recruiter - get my jobs
router.post("/recruiter/my-jobs",jwtMiddleware,jobController.getMyJobsController);

// chatbot route
router.post("/api/chat", chatController.chatController);

module.exports = router