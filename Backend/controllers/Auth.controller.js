const UserProfile = require('../models/UserProfile.model');
const Admin = require('../models/AdminProfile.model');
const User = require('../models/UserAuth.model');
const Otp = require('../models/Otp.model');
const axios = require('axios');
const bcrypt = require('bcryptjs');



require("dotenv").config();

exports.userSignupGenOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log("Received phone number for signup OTP:", phoneNumber);
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this phone number" });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save or update OTP
    await Otp.findOneAndUpdate(
      { phoneNumber },
      { otpCode, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // ✅ Send OTP via TextBee
    try {
      await axios.post(
        `${process.env.TEXTBEE_BASE_URL}/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
        {
          recipients: [phoneNumber],
          message: `Your OTP for signup is ${otpCode}. It is valid for 5 minutes.`,
        },
        {
          headers: {
            "x-api-key": process.env.TEXTBEE_API_KEY,
          },
        }
      );

      console.log(`OTP sent to ${phoneNumber}: ${otpCode}`);
    } catch (smsError) {
      console.error("Error sending OTP via TextBee:", smsError.message);
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP via SMS",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully via TextBee",
    });
  } catch (error) {
    console.error("Error generating OTP:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate OTP",
    });
  }
};



exports.userSignupVerifyOtp = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    // Find OTP record
    const record = await Otp.findOne({ phoneNumber });
    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (record.otpCode !== otpCode) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ OTP verified — delete it
    await Otp.deleteOne({ phoneNumber });

    // Hash password if provided
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // ✅ Create User
    const newUser = new User({
      name,
      email: email || undefined,
      phoneNumber,
      password: hashedPassword || undefined,
    });
    await newUser.save();

    // ✅ Create UserProfile
    const newProfile = new UserProfile({
      name,
      email: email || '',
      phoneNumber,
      userId: newUser._id,
    });
    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: newUser,
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};




// =================== 1️⃣ Generate OTP for Login ===================
exports.userLoginGenOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    // Check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this phone number" });
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save or update OTP
    await Otp.findOneAndUpdate(
      { phoneNumber },
      { otpCode, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // ✅ Send OTP via TextBee
    try {
      await axios.post(
        `${process.env.TEXTBEE_BASE_URL}/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
        {
          recipients: [phoneNumber],
          message: `Your OTP for login is ${otpCode}. It is valid for 5 minutes.`,
        },
        {
          headers: { "x-api-key": process.env.TEXTBEE_API_KEY },
        }
      );

      console.log(`Login OTP sent to ${phoneNumber}: ${otpCode}`);
    } catch (smsError) {
      console.error("Error sending OTP via TextBee:", smsError.message);
      return res.status(500).json({ success: false, message: "Failed to send OTP via SMS" });
    }

    res.status(200).json({ success: true, message: "OTP sent successfully for login" });
  } catch (error) {
    console.error("Error generating login OTP:", error.message);
    res.status(500).json({ success: false, message: "Failed to generate login OTP" });
  }
};


// =================== 2️⃣ Verify Login OTP ===================
exports.userLoginVerifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otpCode } = req.body;

    if (!phoneNumber || !otpCode) {
      return res.status(400).json({ success: false, message: "Phone number and OTP are required" });
    }

    const record = await Otp.findOne({ phoneNumber });
    if (!record) {
      return res.status(400).json({ success: false, message: "OTP expired or not found" });
    }

    if (record.otpCode !== otpCode) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // ✅ OTP valid — delete it for security
    await Otp.deleteOne({ phoneNumber });

    res.status(200).json({ success: true, message: "OTP verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};


// =================== 3️⃣ Login with Password ===================
exports.userLoginPassword = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ success: false, message: "Phone number and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found with this phone number" });
    }

    // Check if password exists (user may be OTP-only)
    if (!user.password) {
      return res.status(400).json({ success: false, message: "This user has not set a password. Please login using OTP." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error during password login:", error.message);
    res.status(500).json({ success: false, message: "Failed to login with password" });
  }
};



// ===================== ADMIN LOGIN =====================
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // ✅ Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Invalid username' });
    }

    // ✅ Compare password directly (since it's not hashed)
    if (password !== admin.password) {
      return res.status(400).json({ success: false, message: 'Invalid password' });
    }

    // ✅ Successful login
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Admin login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
