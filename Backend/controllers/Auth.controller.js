const bcrypt = require('bcryptjs');
const Admin = require('../model/Admin.model');
const User = require('../model/User.model');

// Welcome route
exports.welcome = (req, res) => {
  res.send('Welcome to the Login and Signup API');
};

// ===================== ADMIN SIGNUP =====================
exports.adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check duplicates
    const existingUser = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ===================== ADMIN LOGIN =====================
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== USER SIGNUP =====================
exports.userSignup = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const newUser = new User({ phoneNumber });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================== USER LOGIN =====================
exports.userLogin = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'Mobile number not registered' });
    }

    // Later, integrate OTP verification here
    res.status(200).json({ message: 'Mobile number verified, OTP sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
