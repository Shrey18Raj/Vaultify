const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tag.controller');
const authenticate = require('../middlewares/auth.middleware');

// Create a new tag
router.post('/', authenticate, tagController.createTag);

// Get all tags of a user
router.get('/', authenticate, tagController.getTags);

// Update a tag
router.put('/:tagId', authenticate, tagController.updateTag);

// Delete a tag
router.delete('/:tagId', authenticate, tagController.deleteTag);

// Assign tag to document
router.post('/assign', authenticate, tagController.assignTagToDocument);

// Remove tag from document
router.post('/remove', authenticate, tagController.removeTagFromDocument);

// Get tags for a document
router.get('/document/:documentId', authenticate, tagController.getTagsForDocument);

module.exports = router;
