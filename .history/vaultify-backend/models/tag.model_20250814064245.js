const db = require('../config/db');

const Tag = {
    create: async (userId, name) => {
        const sql = 'INSERT INTO tags (user_id, name) VALUES (?, ?)';
        try {
            const [result] = await db.promise().query(sql, [userId, name]);
            return result;
        } catch (err) {
            console.error('Create Tag Error:', err);
            throw err;
        }
    },

    getAll: async (userId) => {
        const sql = 'SELECT * FROM tags WHERE user_id = ? ORDER BY created_at DESC';
        try {
            const [rows] = await db.promise().query(sql, [userId]);
            return rows;
        } catch (err) {
            console.error('Get All Tags Error:', err);
            throw err;
        }
    },

    delete: async (userId, tagId) => {
        const sql = 'DELETE FROM tags WHERE id = ? AND user_id = ?';
        try {
            const [result] = await db.promise().query(sql, [tagId, userId]);
            return result;
        } catch (err) {
            console.error('Delete Tag Error:', err);
            throw err;
        }
    },

    update: async (userId, tagId, name) => {
        const sql = 'UPDATE tags SET name = ? WHERE id = ? AND user_id = ?';
        try {
            const [result] = await db.promise().query(sql, [name, tagId, userId]);
            return result;
        } catch (err) {
            console.error('Update Tag Error:', err);
            throw err;
        }
    }
};

module.exports = Tag;
