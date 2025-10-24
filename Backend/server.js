const express = require('express');
const app = express();

const mclient= require("mongodb").MongoClient;
const dotenv = require('dotenv');
dotenv.config();

const DBurl = process.env.DBurl 

app.use(express.json());

mclient.connect(DBurl)
.then((client)=>{
  let dbObj = client.db('Hatch_track');
  let USerLoginSignupCollection = dbObj.collection('UserLoginSignup');
  let AdminLoginSignupCollection = dbObj.collection('AdminLoginSignup');
  let UserProfiles = dbObj.collection('UserProfiles');
  let AdminProfiles = dbObj.collection('AdminProfiles');

  app.set('USerLoginSignupCollection', USerLoginSignupCollection);
  app.set('AdminLoginSignupCollection', AdminLoginSignupCollection);
  app.set('UserProfiles', UserProfiles);
  app.set('AdminProfiles', AdminProfiles);    
  console.log("Connected to Database");
})
.catch((err)=>console.log("Database connection error:", err));

const loginSignupRoutes = require('./APIs/LoginSignup');
const userProfileRoutes = require('./APIs/UserProfiles');
const adminProfileRoutes = require('./APIs/AdminProfiles');

app.use('/api', loginSignupRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', adminProfileRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})