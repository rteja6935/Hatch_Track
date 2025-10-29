const express = require('express');
const router = express.Router();
const UserDashboardController = require('../controllers/UserDashboard.controller');

// User profile routes
router.get('/user/:phoneNumber/profile', UserDashboardController.getUserProfile);
router.put('/user/:phoneNumber/profile', UserDashboardController.updateUserProfile);

// Hatchery routes
router.get('/user/:phoneNumber/hatcheries', UserDashboardController.getUserHatcheries);
router.post('/user/:phoneNumber/hatcheries', UserDashboardController.createHatchery);
router.get('/hatchery/:hatcheryId/uploads', UserDashboardController.getHatcheryUploads);

// Upload routes
router.post('/user/:phoneNumber/uploads', UserDashboardController.createUpload);
router.delete('/upload/:uploadId', UserDashboardController.deleteUpload);

// Notification routes
router.get('/user/:phoneNumber/notifications', UserDashboardController.getUserNotifications);
router.put('/notification/:notificationId/read', UserDashboardController.markNotificationRead);

// Dashboard stats
router.get('/user/:phoneNumber/stats', UserDashboardController.getDashboardStats);

module.exports = router;
