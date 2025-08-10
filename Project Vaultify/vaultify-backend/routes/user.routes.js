const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middlewares');

router.get('/overview', authenticate, userController.getUserOverview);

module.exports = router;