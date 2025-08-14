const express = require('express');
const router = express.Router();

const documentController = require('../controllers/document.controller');
const authenticate = require('../middlewares/auth.middleware');

// Upload / create document
router.post('/', authenticate, documentController.createDocument);

// Get document by ID
router.get('/:id', authenticate, documentController.getDocumentById);

// Delete document
router.delete('/:id', authenticate, documentController.deleteDocument);

// Search documents
router.get('/', authenticate, documentController.searchDocuments);

// Get documents by folder
router.get('/folder/:folderId', authenticate, documentController.getDocumentsByFolder);

module.exports = router;
