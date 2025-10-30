const express = require('express');
const router = express.Router();
const { generateOtp, verifyOtp } = require('../controllers/Otp.controller');

// POST: Generate OTP
router.post('/generate-otp', generateOtp);

// POST: Verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;
