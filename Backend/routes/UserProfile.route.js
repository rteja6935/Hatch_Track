const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const userController = require('../controllers/userProfile.controller');
const {
  createUserProfile,
  getAllUsers,
  getUserById,

} = require('../controllers/userProfile.controller');

// Routes


// Create user profile
router.post('/create', createUserProfile);

// Get all users
router.get('/all', getAllUsers);

// Get single user
router.get('/:userId', getUserById);
router.post('/upload-profile-image/:userId', upload.single('userImage'), userController.uploadProfileImage);
router.put('/update-profile-image/:userId', upload.single('userImage'), userController.updateProfileImage);
router.delete('/delete-profile-image/:userId', userController.deleteProfileImage);

router.post('/upload-images/:userId', upload.array('images', 4), userController.uploadMultipleImages);
router.delete('/delete-image/:userId/:publicId', userController.deleteSingleImage);



module.exports = router;
