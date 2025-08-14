const db = require('../config/db');

const User = {
  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  getByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
  create: (userData, callback) => {
    const { firstname, lastname, email, phone, password, profile_picture } = userData;
    db.query(
      'INSERT INTO users (firstname, lastname, email, phone, password, profile_picture) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, phone, password, profile_picture],
      callback
    );
  }
};

module.exports = User;