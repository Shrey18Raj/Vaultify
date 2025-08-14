const db = require('../config/db');

const User = {
  create: (name, email, hashedPassword, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], callback);
  },

  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.length > 0 ? results[0] : null);
    });
  },

  findById: (id, callback) => {
    const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results.length > 0 ? results[0] : null);
    });
  }
};

module.exports = User;
