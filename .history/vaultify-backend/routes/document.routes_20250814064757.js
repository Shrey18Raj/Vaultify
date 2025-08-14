const db = require('../config/db');

const Document = {
  create: (userId, filename, originalName, mimetype, size, callback) => {
    const sql = `
      INSERT INTO documents (user_id, filename, original_name, mimetype, size)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, filename, originalName, mimetype, size], callback);
  },

  findByUser: (userId, callback) => {
    const sql = 'SELECT * FROM documents WHERE user_id = ? ORDER BY upload_date DESC';
    db.query(sql, [userId], callback);
  }
};

module.exports = Document;