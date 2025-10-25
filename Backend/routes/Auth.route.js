const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');

// Default route
router.get('/', AuthController.welcome);

// Admin routes
router.post('/Admin-signup', AuthController.adminSignup);
router.post('/Admin-login', AuthController.adminLogin);

// User routes
router.post('/User-signup', AuthController.userSignup);
router.post('/User-login', AuthController.userLogin);

module.exports = router;
