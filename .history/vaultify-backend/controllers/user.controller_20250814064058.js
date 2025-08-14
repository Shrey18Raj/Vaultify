const db = require('../config/db');

exports.getUserOverview = async (req, res) => {
    const userId = req.user.id;

    try {
        const [userRows] = await db.promise().query(
            'SELECT name FROM users WHERE id = ?', [userId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const [docStatsRows] = await db.promise().query(
            `SELECT 
                COUNT(*) AS totalDocuments,
                IFNULL(SUM(size), 0) AS totalStorageUsed
             FROM documents
             WHERE user_id = ?`, [userId]
        );

        const [recentActivities] = await db.promise().query(
            `SELECT 'upload' AS activityType, title AS documentName, uploaded_at AS timestamp
             FROM documents
             WHERE user_id = ?
             ORDER BY uploaded_at DESC
             LIMIT 5`, [userId]
        );

        res.status(200).json({
            username: userRows[0].name,
            totalDocuments: docStatsRows[0].totalDocuments,
            totalStorageUsedMB: (docStatsRows[0].totalStorageUsed / (1024 * 1024)).toFixed(2),
            recentActivities
        });

    } catch (error) {
        console.error('User Overview Error: ', error);
        res.status(500).json({ message: 'Failed to fetch user overview' });
    }
};
