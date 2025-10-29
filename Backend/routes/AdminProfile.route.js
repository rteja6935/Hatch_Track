const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

const adminController = require('../controllers/admin.controller');

// Create admin
router.post('/create', adminController.createAdmin);

// Get admin profile
router.get('/:adminId', adminController.getAdminProfile);

// Upload / update profile image
router.put('/upload-profile-image/:adminId', upload.single('profileImage'), adminController.uploadProfileImage);

module.exports = router;
