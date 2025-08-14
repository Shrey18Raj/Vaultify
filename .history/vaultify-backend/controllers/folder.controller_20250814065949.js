const Folder = require('../models/folder.model');
const db = require('../config/db');

// Create a new folder
exports.createFolder = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'Folder name is required.' });

  Folder.create(userId, name, (err, result) => {
    if (err) return res.status(500).json({ message: 'Failed to create folder.' });
    res.status(201).json({ message: 'Folder created successfully', folderId: result.insertId });
  });
};

// Get all folders of a user
exports.getFolders = (req, res) => {
  const userId = req.user.id;

  Folder.getAll(userId, (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch folders.' });
    res.status(200).json(rows);
  });
};

// Delete a folder
exports.deleteFolder = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  Folder.delete(id, userId, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to delete folder.' });
    res.status(200).json({ message: 'Folder deleted successfully.' });
  });
};

// Get documents inside a folder (optional shortcut)
exports.getDocumentsByFolder = (req, res) => {
  const { folderId } = req.params;

  db.query('SELECT * FROM documents WHERE folder_id = ? ORDER BY uploaded_at DESC', [folderId], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to fetch documents.' });
    res.status(200).json(rows);
  });
};
