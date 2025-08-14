const db = require('../config/db');
const Document = require('../models/document.model');

// Upload / create document
exports.createDocument = (req, res) => {
  const { user_id, folder_id, title, file_name, file_type, size } = req.body;

  Document.create({ user_id, folder_id, title, file_name, file_type, size }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to upload document.' });
    res.status(201).json({ message: 'Document uploaded successfully', documentId: result.insertId });
  });
};

// Get document by ID
exports.getDocumentById = (req, res) => {
  const { id } = req.params;

  Document.getById(id, (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error.' });
    if (rows.length === 0) return res.status(404).json({ message: 'Document not found.' });
    res.status(200).json(rows[0]);
  });
};

// Delete document
exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  Document.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete document.' });
    res.status(200).json({ message: 'Document deleted successfully.' });
  });
};

// Search documents (full-text)
exports.searchDocuments = (req, res) => {
  const { keyword } = req.query;

  if (!keyword) return res.status(400).json({ message: 'Search keyword is required.' });

  Document.searchDocuments(keyword, (err, results) => {
    if (err) return res.status(500).json({ message: 'Search failed.' });
    res.status(200).json(results);
  });
};

// Get documents by folder
exports.getDocumentsByFolder = (req, res) => {
  const { folderId } = req.params;

  db.query('SELECT * FROM documents WHERE folder_id = ? ORDER BY uploaded_at DESC', [folderId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch documents.' });
    res.status(200).json(rows);
  });
};