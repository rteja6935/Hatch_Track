const router = require('express').Router();
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
  res.send('Welcome to the Login and Signup API');
});


router.post('/Admin-signup', async (req, res) => {
  try {
    const collection = req.app.get('AdminLoginSignupCollection');
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if username already exists
    const existingUsername = await collection.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert new admin
    await collection.insertOne({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Admin account created successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Admin Login
router.post('/Admin-login', async (req, res) => {
  try {
    const collection = req.app.get('AdminLoginSignupCollection');
    const { username, password } = req.body;

    const admin = await collection.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// User Signup (initial registration)
router.post('/User-signup', async (req, res) => {
  try {
    const collection = req.app.get('USerLoginSignupCollection');
    const { phoneNumber } = req.body;

    // Check if number already exists
    const existingUser = await collection.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    // Insert new user                                              
    await collection.insertOne({ phoneNumber });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Login (validate mobile number)
router.post('/User-login', async (req, res) => {
  try {
    const collection = req.app.get('USerLoginSignupCollection');
    const { phoneNumber } = req.body;

    const user = await collection.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: 'Mobile number not registered' });
    }

    // Here you can integrate OTP logic
    res.status(200).json({ message: 'Mobile number verified, OTP sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router; 