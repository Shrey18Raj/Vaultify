const express = require('express');
const router = express.Router();

const folderController = require('../controllers/folder.controller');
const authenticate = require('../middlewares/auth.middleware');

// Create a new folder
router.post('/', authenticate, folderController.createFolder);

// Get all folders of a user
router.get('/', authenticate, folderController.getFolders);

// Delete a folder
router.delete('/:id', authenticate, folderController.deleteFolder);

// Get documents inside a folder (optional shortcut)
router.get('/:folderId/documents', authenticate, folderController.getDocumentsByFolder);

module.exports = router;
