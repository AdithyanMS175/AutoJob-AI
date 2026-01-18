const express = require('express')
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const userController = require('../controllers/userController');
const applicationController = require('../controllers/applicationController')
const multerMiddleware = require('../middlewares/multerMiddlewares');
const resumeMulter = require('../middlewares/resumeMulter');
const jobController = require('../controllers/jobController');
const chatController  = require('../controllers/chatController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = new express.Router()

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//google login
router.post('/google-login',userController.googleLoginController)

router.get("/user/:id",jwtMiddleware,userController.getUserController);

//candidate edit
router.put('/user/:id/edit',jwtMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdateController)

//candidate resume add
router.put("/user/:id/resume",jwtMiddleware,resumeMulter.single("resumes"),userController.userResumeUploadController);

//recruiter job add
router.post("/user/add/job",jwtMiddleware,jobController.addJobController)

//candidate all jobs
router.get("/candidate/jobs",jwtMiddleware,jobController.userAllJobsController)

//canidate job apply
router.post("/application/apply",jwtMiddleware,applicationController.applyJobsController)

//user subscription
router.put("/users/payment",jwtMiddleware,userController.userVerificationPaymentController);

//user get me
router.get("/users/me", jwtMiddleware, userController.getCurrentUser);

//user resume autofill
router.post("/user/auto-fill-profile",jwtMiddleware,userController.autoFillProfileFromResume);

// recruiter - get my jobs
router.post("/recruiter/my-jobs",jwtMiddleware,jobController.getMyJobsController);

// recruiter - get applicants for each job
router.post("/recruiter/applicants/:jobId",jwtMiddleware,applicationController.recruiterJobApplicantsController);

// recruiter delete job
router.delete("/recruiter/job/:jobId",jwtMiddleware,jobController.deleteJobController);

// recruiter delete a specific application
router.delete("/recruiter/application/:applicationId",jwtMiddleware,applicationController.deleteApplicationController);

//recruiter dashboard 
router.post("/recruiter/dashboard",jwtMiddleware,userController.recruiterDashboardController
);

// chatbot route
router.post("/api/chat", chatController.chatController);

//admin dashboard
router.get("/admin/dashboard",adminMiddleware,userController.adminDashboardController);

//admin all users
router.get("/admin/users",adminMiddleware,userController.getAllUsersController);

//admin user delete
router.delete("/admin/user/:id",adminMiddleware,userController.deleteUserController);

//recruiter application accept
router.put("/recruiter/application/accept/:applicationId",jwtMiddleware,applicationController.acceptApplicationController);

//admin all jobs
router.get("/admin/jobs",adminMiddleware,userController.getAllJobsController);

//admin all applications
router.get("/admin/applications",adminMiddleware,userController.getAllApplicationsController);

//admin delete job
router.delete("/admin/job/:jobId",adminMiddleware,userController.deleteAdminJobController);

//admin delete applications
router.delete("/admin/application/:applicationId",adminMiddleware,userController.deleteAdminApplicationController);

//admin dashboard report
router.get("/admin/dashboard/report",adminMiddleware,userController.downloadDashboardReport);

module.exports = router