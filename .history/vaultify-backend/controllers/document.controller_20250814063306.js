const db = require('../config/db');
const DocumentTag = require('../models/documentTag.model');
const Document = require('../models/document.model');

// Create a new document
exports.createDocument = async (req, res) => {
  const userId = req.user.id;
  const { title, folderId, fileType, size } = req.body;
  const originalName = req.file?.originalname || '';

  if (!title || !fileType || !size) {
    return res.status(400).json({ message: 'Title, file type, and size are required.' });
  }

  try {
    const sql = `
      INSERT INTO documents (user_id, title, folder_id, file_type, size, original_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.promise().query(sql, [userId, title, folderId || null, fileType, size, originalName]);
    res.status(201).json({ message: 'Document created successfully', documentId: result.insertId });
  } catch (error) {
    console.error('Create Document Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all documents for a user
exports.getDocuments = async (req, res) => {
  const userId = req.user.id;
  try {
    const [documents] = await db.promise().query(
      'SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC',
      [userId]
    );
    res.status(200).json(documents);
  } catch (error) {
    console.error('Get Documents Error:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

// Get documents by folder
exports.getDocumentsByFolder = async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.folderId;

  try {
    const [documents] = await db.promise().query(
      'SELECT * FROM documents WHERE user_id = ? AND folder_id = ? ORDER BY uploaded_at DESC',
      [userId, folderId]
    );
    res.status(200).json(documents);
  } catch (error) {
    console.error('Get Documents By Folder Error:', error);
    res.status(500).json({ message: 'Failed to fetch documents' });
  }
};

// Update document (e.g., title or folder)
exports.updateDocument = async (req, res) => {
  const { documentId } = req.params;
  const { title, folderId } = req.body;

  try {
    const [result] = await db.promise().query(
      'UPDATE documents SET title = ?, folder_id = ? WHERE id = ?',
      [title, folderId, documentId]
    );
    res.status(200).json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Update Document Error:', error);
    res.status(500).json({ message: 'Failed to update document' });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const [result] = await db.promise().query(
      'DELETE FROM documents WHERE id = ?',
      [documentId]
    );
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Delete Document Error:', error);
    res.status(500).json({ message: 'Failed to delete document' });
  }
};

// Full-text search
exports.searchDocuments = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) return res.status(400).json({ message: 'Keyword is required' });

  try {
    const searchQuery = `
      SELECT DISTINCT d.*
      FROM documents d
      LEFT JOIN document_tags dt ON d.id = dt.document_id
      LEFT JOIN tags t ON dt.tag_id = t.id
      LEFT JOIN folders f ON d.folder_id = f.id
      WHERE d.title LIKE ? OR t.name LIKE ? OR f.name LIKE ?
      ORDER BY d.uploaded_at DESC
    `;
    const likeKeyword = `%${keyword}%`;
    const [results] = await db.promise().query(searchQuery, [likeKeyword, likeKeyword, likeKeyword]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Search Documents Error:', error);
    res.status(500).json({ message: 'Search failed' });
  }
};

// Get tags for a document
exports.getTagsForDocument = async (req, res) => {
  const { documentId } = req.params;
  try {
    DocumentTag.getTagsForDocument(documentId, (err, results) => {
      if (err) {
        console.error('Get Tags Error:', err);
        return res.status(500).json({ message: 'Failed to fetch tags' });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Get Tags Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Assign tag to document
exports.assignTagToDocument = (req, res) => {
  const { documentId, tagId } = req.body;
  if (!documentId || !tagId) return res.status(400).json({ message: 'documentId and tagId required' });

  DocumentTag.assignTag(documentId, tagId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to assign tag' });
    res.status(200).json({ message: 'Tag assigned successfully' });
  });
};

exports.removeTagFromDocument = (req, res) => {
  const { documentId, tagId } = req.body;
  if (!documentId || !tagId) return res.status(400).json({ message: 'documentId and tagId required' });

  DocumentTag.removeTag(documentId, tagId, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to remove tag' });
    res.status(200).json({ message: 'Tag removed successfully' });
  });
};
