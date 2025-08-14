const db = require('../config/db');

const Document = {
        create: (userId, filename, originalName, mimetype, size, iv, callback) => {
    const sql = `
        INSERT INTO documents (user_id, filename, original_name, mimetype, size, iv)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, filename, originalName, mimetype, size, iv], callback);
    },


    findByUser: (userId, callback) => {
        const sql = 'SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC';
        db.query(sql, [userId], callback);
    },

    getByFilename: (filename, callback) => {
        const sql = 'SELECT * FROM documents WHERE filename = ?';
        db.query(sql, [filename], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length > 0 ? results[0] : null);
        });
    },

    deleteByFilename: (filename, userId, callback) => {
        const sql = 'DELETE FROM documents WHERE filename = ? AND user_id = ?';
        db.query(sql, [filename, userId], callback);
    },

    getStatsByUser: (userId, callback) => {
        const sql = `
            SELECT 
                COUNT(*) AS totalDocuments,
                COALESCE(SUM(size), 0) AS totalSize,
                GROUP_CONCAT(DISTINCT mimetype) AS types
            FROM documents 
            WHERE user_id = ?
        `;
        db.query(sql, [userId], callback);
    },

    getRecentByUser: (userId, limit, callback) => {
        const sql = `
            SELECT id, original_name, mimetype, size, uploaded_at 
            FROM documents 
            WHERE user_id = ? 
            ORDER BY uploaded_at DESC 
            LIMIT ?
        `;
        db.query(sql, [userId, limit], callback);
    },

    findByUserAndFolder: (userId, folderId, callback) => {
        const sql = `
            SELECT id, original_name, filename, mimetype, size, uploaded_at 
            FROM documents 
            WHERE user_id = ? AND folder_id = ? 
            ORDER BY uploaded_at DESC
        `;
        db.query(sql, [userId, folderId], callback);
    },

    findByIdAndUser: (docId, userId, callback) => {
        const sql = `
            SELECT d.*, f.name AS folder_name 
            FROM documents d 
            LEFT JOIN folders f ON d.folder_id = f.id 
            WHERE d.id = ? AND d.user_id = ?
        `;
        db.query(sql, [docId, userId], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results.length > 0 ? results[0] : null);
        });
    },

    searchDocuments: (keyword, callback) => {
        const searchQuery = `
            SELECT DISTINCT d.* 
            FROM documents d 
            LEFT JOIN document_tags dt ON d.id = dt.document_id 
            LEFT JOIN tags t ON dt.tag_id = t.id 
            LEFT JOIN folders f ON d.folder_id = f.id 
            WHERE d.original_name LIKE ? OR t.name LIKE ? OR f.name LIKE ? 
            ORDER BY d.uploaded_at DESC
        `;
        const likeKeyword = `%${keyword}%`;
        db.query(searchQuery, [likeKeyword, likeKeyword, likeKeyword], callback);
    }
};

module.exports = Document;