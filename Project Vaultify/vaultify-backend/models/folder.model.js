const db = require('../config/db');

const Folder = {
    create: (userId, name, callback) => {
        const sql = 'INSERT INTO folders (user_id, name) VALUES (?, ?)';
        db.query(sql, [userId, name], callback);
    },
    
    findAllByUser: (userId, callback) => {
        const sql = 'SELECT * FROM folders WHERE user_id = ? ORDER BY created_at DESC';
        db.query(sql, [userId], callback);
    },

    findByIdAndUser: (folderId, userId, callback) => {
        const sql = 'SELECT * FROM folders WHERE id = ? AND user_id = ?';
        db.query(sql, [folderId, userId], (err, results) => {
            if(err) return callback(err, null);
            callback(null, results.length > 0 ? results[0] : null);
        });
    },

    delete: (folderId, userId, callback) => {
        const sql = 'DELETE FROM folders WHERE id = ? AND user_id = ?';
        db.query(sql, [folderId, userId], callback);
    }
};

module.exports = Folder;