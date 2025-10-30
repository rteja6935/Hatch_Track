const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');


router.post('/User-signup-otpVerify', AuthController.userSignupVerifyOtp);
router.post('/User-signup-otpGen', AuthController.userSignupGenOtp);

// User routes
router.post('/User-login-password', AuthController.userLoginPassword);
router.post('/User-login-otpVerify', AuthController.userLoginVerifyOtp);
router.post('/User-login-otpGen', AuthController.userLoginGenOtp);



// Admin routes
router.post('/Admin-login', AuthController.adminLogin);


module.exports = router;
