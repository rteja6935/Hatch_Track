const axios = require('axios');
const Otp = require('../models/Otp.model');
require('dotenv').config();

// Helper: generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// =================== Generate OTP ===================
exports.generateOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Generate new OTP
    const otpCode = generateOtp();

    // Store in DB (replace old OTP if exists)
    await Otp.findOneAndUpdate(
      { phoneNumber },
      { otpCode, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // Send SMS via TextBee API
    const response = await axios.post(
      `${process.env.TEXTBEE_BASE_URL}/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
      {
        recipients: [phoneNumber],
        message: `Your OTP is ${otpCode}. It is valid for 5 minutes.`,
      },
      { headers: { 'x-api-key': process.env.TEXTBEE_API_KEY } }
    );

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully!',
      data: response.data,
    });
  } catch (error) {
    console.error('Error sending OTP:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

// =================== Validate OTP ===================
exports.verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    // Find OTP
    const record = await Otp.findOne({ phoneNumber });
    if (!record) {
      return res.status(400).json({ success: false, message: 'OTP expired or not found' });
    }

    if (record.otpCode !== otpCode) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP valid — delete it (optional)
    await Otp.deleteOne({ phoneNumber });

    res.status(200).json({ success: true, message: 'OTP verified successfully!' });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ success: false, message: 'Failed to verify OTP' });
  }
};
