const db = require('../config/db');

const Tag = {
    create: (userId, name, callback) => {
        const sql = 'INSERT INTO tags (user_id, name) VALUES (?, ?)';
        db.query(sql, [userId, name], callback);
    },

    getAll: (userId, callback) => {
        const sql = 'SELECT * FROM tags WHERE user_id = ? ORDER BY created_at DESC';
        db.query(sql, [userId], callback);
    },

    delete: (userId, tagId, callback) => {
        const sql = 'DELETE FROM tags WHERE id = ? AND user_id = ?';
        db.query(sql, [tagId], callback);
    },

    update: (userId, tagId, name, callback) => {
        const sql = 'UPDATE tags SET name = ? WHERE id = ? AND user_id = ?';
        db.query(sql, [name, tagId, userId], callback);
    }
};

module.exports = Tag;