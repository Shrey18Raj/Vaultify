const db = require('../config/db');

const Folder = {
  create: (userId, name, callback) => {
    db.query('INSERT INTO folders (user_id, name) VALUES (?, ?)', [userId, name], callback);
  },

  getAll: (userId, callback) => {
    db.query('SELECT * FROM folders WHERE user_id = ?', [userId], callback);
  },

  delete: (id, userId, callback) => {
    db.query('DELETE FROM folders WHERE id = ? AND user_id = ?', [id, userId], callback);
  }
};

module.exports = Folder;
