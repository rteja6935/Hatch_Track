// const express = require('express');
// const app = express();

// const mclient= require("mongodb").MongoClient;
// const dotenv = require('dotenv');
// dotenv.config();

// const DBurl = process.env.DBurl 

// app.use(express.json());

// mclient.connect(DBurl)
// .then((client)=>{
//   let dbObj = client.db('Hatch_track');
//   let USerLoginSignupCollection = dbObj.collection('UserLoginSignup');
//   let AdminLoginSignupCollection = dbObj.collection('AdminLoginSignup');
//   let UserProfiles = dbObj.collection('UserProfiles');
//   let AdminProfiles = dbObj.collection('AdminProfiles');

//   app.set('USerLoginSignupCollection', USerLoginSignupCollection);
//   app.set('AdminLoginSignupCollection', AdminLoginSignupCollection);
//   app.set('UserProfiles', UserProfiles);
//   app.set('AdminProfiles', AdminProfiles);    
//   console.log("Connected to Database");
// })
// .catch((err)=>console.log("Database connection error:", err));

// const loginSignupRoutes = require('./APIs/LoginSignup');
// const userProfileRoutes = require('./APIs/UserProfiles');
// const adminProfileRoutes = require('./APIs/AdminProfiles');

// app.use('/api', loginSignupRoutes);
// app.use('/api', userProfileRoutes);
// app.use('/api', adminProfileRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// })


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

// Connect MongoDB using Mongoose
mongoose.connect(process.env.DBurl)
.then(() => console.log('✅ Connected to MongoDB via Mongoose'))
.catch((err) => console.error('❌ Database connection error:', err));

// Import routes
const authRoutes = require('./routes/Auth.route');
const userDashboardRoutes = require('./routes/UserDashboard.route');

// Use routes
app.use('/api', authRoutes);
app.use('/api', userDashboardRoutes);

// Start server
app.listen(3000, () => console.log('🚀 Server running on port 3000'));
