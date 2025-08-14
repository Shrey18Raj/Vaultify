const Tag = require('../models/tag.model');
const DocumentTag = require('../models/documentTag.model');

// Create a new tag
exports.createTag = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Tag name is required.' });

  Tag.create(userId, name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to create tag.' });
    res.status(201).json({ message: 'Tag created successfully', tagId: result.insertId });
  });
};

// Get all tags of a user
exports.getTags = (req, res) => {
  const userId = req.user.id;

  Tag.getAll(userId, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch tags.' });
    res.status(200).json(rows);
  });
};

// Update a tag
exports.updateTag = (req, res) => {
  const userId = req.user.id;
  const { tagId } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Tag name is required.' });

  Tag.update(userId, tagId, name, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to update tag.' });
    res.status(200).json({ message: 'Tag updated successfully.' });
  });
};

// Delete a tag
exports.deleteTag = (req, res) => {
  const userId = req.user.id;
  const { tagId } = req.params;

  Tag.delete(userId, tagId, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete tag.' });
    res.status(200).json({ message: 'Tag deleted successfully.' });
  });
};

// Assign tag to document
exports.assignTagToDocument = (req, res) => {
  const { documentId, tagId } = req.body;

  if (!documentId || !tagId) return res.status(400).json({ message: 'Document ID and Tag ID are required.' });

  DocumentTag.assignTag(documentId, tagId, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to assign tag.' });
    res.status(200).json({ message: 'Tag assigned to document successfully.' });
  });
};

// Remove tag from document
exports.removeTagFromDocument = (req, res) => {
  const { documentId, tagId } = req.body;

  if (!documentId || !tagId) return res.status(400).json({ message: 'Document ID and Tag ID are required.' });

  DocumentTag.removeTag(documentId, tagId, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to remove tag.' });
    res.status(200).json({ message: 'Tag removed from document successfully.' });
  });
};

// Get tags for a document
exports.getTagsForDocument = (req, res) => {
  const { documentId } = req.params;

  DocumentTag.getTagsForDocument(documentId, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch tags.' });
    res.status(200).json(rows);
  });
};
