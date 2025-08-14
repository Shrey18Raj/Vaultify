const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/auth.middleware');

// Login
router.post('/login', authController.login);

// Profile
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

// Quick self info
router.get('/me', authenticate, authController.getMe);

module.exports = router;
