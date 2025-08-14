const db = require('../config/db');

const Tag = {
  create: (userId, name, callback) => {
    db.query('INSERT INTO tags (user_id, name) VALUES (?, ?)', [userId, name], callback);
  },

  getAll: (userId, callback) => {
    db.query('SELECT * FROM tags WHERE user_id = ? ORDER BY created_at DESC', [userId], callback);
  },

  update: (userId, tagId, name, callback) => {
    db.query('UPDATE tags SET name = ? WHERE id = ? AND user_id = ?', [name, tagId, userId], callback);
  },

  delete: (userId, tagId, callback) => {
    db.query('DELETE FROM tags WHERE id = ? AND user_id = ?', [tagId, userId], callback);
  }
};

module.exports = Tag;