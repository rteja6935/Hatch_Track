const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');


// Signup routes
router.post('/User-signup-otpVerify', (req, res, next) => {
  console.log("request hit");
  next(); // important: pass control to next middleware/controller
}, AuthController.userSignupVerifyOtp);
router.post('/User-signup-otpGen', AuthController.userSignupGenOtp);

// Login routes
router.post('/User-login-password', AuthController.userLoginPassword);
router.post('/User-login-otpVerify', AuthController.userLoginVerifyOtp);
router.post('/User-login-otpGen', AuthController.userLoginGenOtp);

// Password management routes
router.post('/User-check-password', AuthController.checkUserPassword);
router.post('/User-create-password', AuthController.createUserPassword);
router.post('/User-forgot-password-otp', AuthController.forgotPasswordSendOtp);
router.post('/User-reset-password', AuthController.resetPasswordWithOtp);

// Admin routes
router.post('/Admin-login', AuthController.adminLogin);


module.exports = router;
