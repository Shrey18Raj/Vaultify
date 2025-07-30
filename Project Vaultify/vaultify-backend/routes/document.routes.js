const express = require('express');
const router = express.Router();
const DocumentController = require('../controllers/document.controller');
const authenticateToken = require('../middlewares/auth.middlewares');

router.post('/upload', authenticateToken, DocumentController.uploadFile);

router.get('/my-documents', authenticateToken, DocumentController.getMyDocuments);

router.get('/detail/:id', authenticateToken, DocumentController.getDocumentDetail);

router.get('/download/:filename', authenticateToken, DocumentController.downloadFile);

router.get('/shared-access/:token', DocumentController.sharedAccess);

router.delete('/delete/:filename', authenticateToken, DocumentController.deleteFile);

router.get('/stats', authenticateToken, DocumentController.getDashboardStats);

router.get('/by-folder/:folderId', authenticateToken, DocumentController.getDocumentsByFolder)

router.post('/secure-share/:id', authenticateToken, DocumentController.generateAdvancedShareToken);

router.post('/secure-access/:token', DocumentController.sharedAccess)

module.exports = router;