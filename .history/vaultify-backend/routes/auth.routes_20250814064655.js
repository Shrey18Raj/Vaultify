const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Public Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// ✅ Protected Route
router.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
