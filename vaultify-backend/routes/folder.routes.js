const express = require('express');
const router = express.Router();
const FolderController = require('../controllers/folder.controller');
const authenticateToken = require('../middlewares/auth.middlewares');

router.post('/create', authenticateToken, FolderController.createFolder);

router.get('/all', authenticateToken, FolderController.getFolders);

router.delete('/delete/:id', authenticateToken, FolderController.deleteFolder);

module.exports = router;