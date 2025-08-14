const Tag = require('../models/tag.model');
const DocumentTag = require('../models/documentTag.model');

exports.createTag = (req, res) => {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) return res.status(400).json({ error: 'Tag name is required.' });

    Tag.create(userId, name, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to create tag' });
        res.status(201).json({ message: 'Tag created successfully', tagId: result.insertId });
    });
};

exports.getTags = (req, res) => {
    const userId = req.user.id;

    Tag.getAll(userId, (err, tags) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch tags' });
        res.status(200).json({ tags });
    });
};

exports.updateTag = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'New tag name is required' });

  Tag.update(userId, id, name, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to update tag' });
    res.status(200).json({ message: 'Tag updated successfully' });
  });
};

exports.deleteTag = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  Tag.delete(userId, id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete tag' });
    res.status(200).json({ message: 'Tag deleted successfully' });
  });
};

exports.assignTagToDocument = (req, res) => {
  const { documentId, tagId } = req.body;
  if (!documentId || !tagId) {
    return res.status(400).json({ message: 'documentId and tagId are required.' });
  }

  DocumentTag.assignTag(documentId, tagId, (err, result) => {
    if (err) {
      console.error('Error assigning tag:', err);
      return res.status(500).json({ message: 'Failed to assign tag.' });
    }
    res.status(200).json({ message: 'Tag assigned successfully.' });
  });
};

exports.removeTagFromDocument = (req, res) => {
  const { documentId, tagId } = req.body;
  if (!documentId || !tagId) {
    return res.status(400).json({ message: 'documentId and tagId are required.' });
  }

  DocumentTag.removeTag(documentId, tagId, (err, result) => {
    if (err) {
      console.error('Error removing tag:', err);
      return res.status(500).json({ message: 'Failed to remove tag.' });
    }
    res.status(200).json({ message: 'Tag removed successfully.' });
  });
};

exports.getTagsForDocument = (req, res) => {
  const { documentId } = req.params;
  DocumentTag.getTagsForDocument(documentId, (err, results) => {
    if (err) {
      console.error('Error retrieving tags:', err);
      return res.status(500).json({ message: 'Failed to fetch tags.' });
    }
    res.status(200).json(results);
  });
};