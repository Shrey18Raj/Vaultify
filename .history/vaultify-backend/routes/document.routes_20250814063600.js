const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');
const authenticate = require('../middleware/auth.middleware');

// Document CRUD
router.post('/', authenticate, documentController.createDocument);
router.get('/', authenticate, documentController.getDocuments);
router.get('/search', authenticate, documentController.searchDocuments);
router.delete('/:id', authenticate, documentController.deleteDocument);

module.exports = router;
