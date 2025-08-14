const db = require('../config/db');

const Document = {
  create: (data, callback) => {
    const { user_id, folder_id, title, file_name, file_type, size } = data;
    db.query(
      'INSERT INTO documents (user_id, folder_id, title, file_name, file_type, size) VALUES (?, ?, ?, ?, ?, ?)',
      [user_id, folder_id, title, file_name, file_type, size],
      callback
    );
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM documents WHERE id = ?', [id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM documents WHERE id = ?', [id], callback);
  },

  searchDocuments: (keyword, callback) => {
    const sql = `
      SELECT DISTINCT d.*
      FROM documents d
      LEFT JOIN document_tags dt ON d.id = dt.document_id
      LEFT JOIN tags t ON dt.tag_id = t.id
      LEFT JOIN folders f ON d.folder_id = f.id
      WHERE d.title LIKE ? OR t.name LIKE ? OR f.name LIKE ?
      ORDER BY d.uploaded_at DESC
    `;
    const likeKeyword = `%${keyword}%`;
    db.query(sql, [likeKeyword, likeKeyword, likeKeyword], callback);
  }
};

module.exports = Document;