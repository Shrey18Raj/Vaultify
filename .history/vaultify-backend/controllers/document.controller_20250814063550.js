const db = require('../config/db');

// Create a new document
exports.createDocument = (req, res) => {
  const { title, file_type, size, folder_id } = req.body;
  const userId = req.user.id;

  if (!title || !file_type || !size) {
    return res.status(400).json({ message: 'Title, file_type, and size are required' });
  }

  const sql = `INSERT INTO documents (title, file_type, size, folder_id, user_id, uploaded_at)
               VALUES (?, ?, ?, ?, ?, NOW())`;

  db.query(sql, [title, file_type, size, folder_id || null, userId], (err, result) => {
    if (err) {
      console.error('Create Document Error:', err);
      return res.status(500).json({ message: 'Failed to create document' });
    }
    res.status(201).json({ message: 'Document created successfully', documentId: result.insertId });
  });
};

// Get all documents of the user
exports.getDocuments = (req, res) => {
  const userId = req.user.id;

  const sql = `SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC`;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Get Documents Error:', err);
      return res.status(500).json({ message: 'Failed to fetch documents' });
    }
    res.status(200).json(results);
  });
};

// Search documents by keyword (title, tags, folder)
exports.searchDocuments = (req, res) => {
  const userId = req.user.id;
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Search keyword is required' });
  }

  const likeKeyword = `%${keyword}%`;

  const sql = `
    SELECT DISTINCT d.*
    FROM documents d
    LEFT JOIN document_tags dt ON d.id = dt.document_id
    LEFT JOIN tags t ON dt.tag_id = t.id
    LEFT JOIN folders f ON d.folder_id = f.id
    WHERE d.user_id = ? AND (d.title LIKE ? OR t.name LIKE ? OR f.name LIKE ?)
    ORDER BY d.uploaded_at DESC
  `;

  db.query(sql, [userId, likeKeyword, likeKeyword, likeKeyword], (err, results) => {
    if (err) {
      console.error('Search Documents Error:', err);
      return res.status(500).json({ message: 'Failed to search documents' });
    }
    res.status(200).json(results);
  });
};

// Delete a document by ID
exports.deleteDocument = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `DELETE FROM documents WHERE id = ? AND user_id = ?`;

  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      console.error('Delete Document Error:', err);
      return res.status(500).json({ message: 'Failed to delete document' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Document not found or not authorized' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  });
};