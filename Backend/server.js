const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect MongoDB
mongoose.connect(process.env.DBurl, { dbName: 'hatchseed' })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

// Routes
const AuthRoutes = require('./routes/Auth.route');

const userProfileRoutes = require('./routes/UserProfile.route');
const adminRoutes = require('./routes/AdminProfile.route');
const otpRoutes = require('./routes/Otp.route'); // 👈 Add this

// Use routes

app.use('/api/user', userProfileRoutes);
app.use('/api/Auth', AuthRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/otp', otpRoutes); // 👈 Add OTP route

// Start server
app.listen(process.env.PORT || 3000, () => console.log(`🚀 Server running`));
