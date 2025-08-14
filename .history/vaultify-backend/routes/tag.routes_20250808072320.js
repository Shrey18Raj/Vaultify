const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tag.controller');
const authenticate = require('../middlewares/auth.middlewares');

router.post('/', authenticate, tagController.createTag);
router.get('/', authenticate, tagController.getTags);
router.put('/:id', authenticate, tagController.updateTag);
router.delete('/:id', authenticate, tagController.deleteTag);

router.post('/assign', tagController.assignTagToDocument);
router.post('/remove', tagController.removeTagFromDocument);
router.get('/document/:documentId', tagController.getTagsForDocument);

module.exports = router;