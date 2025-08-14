const db = require('../config/db');

const User = {
    create: async (name, email, hashedPassword) => {
        const sql = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)';
        try {
            const [result] = await db.promise().query(sql, [name, email, hashedPassword]);
            return result;
        } catch (err) {
            console.error('Create User Error:', err);
            throw err;
        }
    },

    findByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
            const [rows] = await db.promise().query(sql, [email]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Find User By Email Error:', err);
            throw err;
        }
    },

    findById: async (id) => {
        const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
        try {
            const [rows] = await db.promise().query(sql, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Find User By ID Error:', err);
            throw err;
        }
    }
};

module.exports = User;
