const db = require('../config/db');

exports.getUserOverview = async (req, res) => {
    const userId = req.user.id;

    try {
        const [userRows] = await db.promise().query(
            'SELECT name FROM users WHERE id = ?', [userId]
        );

        if (userRows.length === 0) return res.status(404).json({ message: 'User not found' });

        const [docCountRows] = await db.promise().query(
            'SELECT COUNT(*) AS totalDocuments FROM documents WHERE user_id = ?', [userId]
        );

        const [storageRows] = await db.promise().query(
            'SELECT IFNULL(SUM(size), 0) AS totalStorageUsed FROM documents WHERE user_id = ?', [userId]
        );

        const [recentActivities] = await db.promise().query(
            `SELECT 'upload' AS activityType, original_name AS documentName, upload_date AS timestamp FROM documents WHERE user_id = ? ORDER BY upload_date DESC LIMIT 5`, [userId]
        );

        res.status(200).json({
            username: userRows[0].name,
            totalDocuments: docCountRows[0].totalDocuments,
            totalStorageUsed: storageRows[0].totalStorageUsed,
            recentActivities
        });
    } catch (error) {
        console.error('User Overview Error: ', error);
        res.status(500).json({ message: 'Failed to fetch user overview' });
    }
};