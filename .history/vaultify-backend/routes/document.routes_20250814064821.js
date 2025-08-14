const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// 🔐 Protected Upload
router.post('/upload', authenticateToken, DocumentController.uploadFile);

// 📄 List User Documents
router.get('/my-documents', authenticateToken, DocumentController.getMyDocuments);

module.exports = router;
