const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const authenticateToken = require('../middlewares/auth.middlewares');

router.get('/overview', authenticateToken, DashboardController.getOverview);

module.exports = router;