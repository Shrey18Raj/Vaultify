const db = require('../config/db');

exports.createDocument = async (req, res) => {
    try {
        const { title, file_type, size, folder_id } = req.body;
        const userId = req.user.id;

        if (!title || !file_type || !size) {
            return res.status(400).json({ message: 'Title, file_type, and size are required' });
        }

        const sql = `INSERT INTO documents (title, file_type, size, folder_id, user_id, uploaded_at)
                     VALUES (?, ?, ?, ?, ?, NOW())`;

        const [result] = await db.promise().query(sql, [title, file_type, size, folder_id || null, userId]);
        res.status(201).json({ message: 'Document created successfully', documentId: result.insertId });

    } catch (err) {
        console.error('Create Document Error:', err);
        res.status(500).json({ message: 'Failed to create document' });
    }
};

exports.getDocuments = async (req, res) => {
    try {
        const userId = req.user.id;
        const sql = `SELECT * FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC`;
        const [results] = await db.promise().query(sql, [userId]);
        res.status(200).json(results);
    } catch (err) {
        console.error('Get Documents Error:', err);
        res.status(500).json({ message: 'Failed to fetch documents' });
    }
};

exports.searchDocuments = async (req, res) => {
    try {
        const userId = req.user.id;
        const { keyword } = req.query;

        if (!keyword) return res.status(400).json({ message: 'Search keyword is required' });

        const likeKeyword = `%${keyword}%`;
        const sql = `
            SELECT DISTINCT d.*
            FROM documents d
            LEFT JOIN document_tags dt ON d.id = dt.document_id
            LEFT JOIN tags t ON dt.tag_id = t.id
            LEFT JOIN folders f ON d.folder_id = f.id
            WHERE d.user_id = ? AND (d.title LIKE ? OR t.name LIKE ? OR f.name LIKE ?)
            ORDER BY d.uploaded_at DESC
        `;

        const [results] = await db.promise().query(sql, [userId, likeKeyword, likeKeyword, likeKeyword]);
        res.status(200).json(results);
    } catch (err) {
        console.error('Search Documents Error:', err);
        res.status(500).json({ message: 'Failed to search documents' });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const sql = `DELETE FROM documents WHERE id = ? AND user_id = ?`;

        const [result] = await db.promise().query(sql, [id, userId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Document not found or not authorized' });
        }
        res.status(200).json({ message: 'Document deleted successfully' });
    } catch (err) {
        console.error('Delete Document Error:', err);
        res.status(500).json({ message: 'Failed to delete document' });
    }
};