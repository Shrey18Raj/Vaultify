const express = require('express');
const router = express.Router();

const analyticsController = require('../controllers/analytics.controller');
const authenticate = require('../middlewares/auth.middleware');

// Get dashboard stats for current user
router.get('/dashboard', authenticate, analyticsController.getDashboardStats);

module.exports = router;
