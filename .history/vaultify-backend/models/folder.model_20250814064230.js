const db = require('../config/db');

const Folder = {
    create: async (userId, name) => {
        const sql = 'INSERT INTO folders (user_id, name) VALUES (?, ?)';
        try {
            const [result] = await db.promise().query(sql, [userId, name]);
            return result;
        } catch (err) {
            console.error('Create Folder Error:', err);
            throw err;
        }
    },

    findAllByUser: async (userId) => {
        const sql = 'SELECT * FROM folders WHERE user_id = ? ORDER BY created_at DESC';
        try {
            const [rows] = await db.promise().query(sql, [userId]);
            return rows;
        } catch (err) {
            console.error('Find All Folders Error:', err);
            throw err;
        }
    },

    findByIdAndUser: async (folderId, userId) => {
        const sql = 'SELECT * FROM folders WHERE id = ? AND user_id = ?';
        try {
            const [rows] = await db.promise().query(sql, [folderId, userId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Find Folder By ID Error:', err);
            throw err;
        }
    },

    delete: async (folderId, userId) => {
        const sql = 'DELETE FROM folders WHERE id = ? AND user_id = ?';
        try {
            const [result] = await db.promise().query(sql, [folderId, userId]);
            return result;
        } catch (err) {
            console.error('Delete Folder Error:', err);
            throw err;
        }
    }
};

module.exports = Folder;
