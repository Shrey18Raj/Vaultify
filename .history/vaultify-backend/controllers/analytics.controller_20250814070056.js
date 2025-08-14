const db = require('../config/db');

// Get dashboard stats for a user
exports.getDashboardStats = async (req, res) => {
  const userId = req.user.id;

  try {
    // Total documents
    const [totalDocsRows] = await db.promise().query(
      'SELECT COUNT(*) AS totalDocuments FROM documents WHERE user_id = ?',
      [userId]
    );
    const totalDocuments = totalDocsRows[0].totalDocuments || 0;

    // Total storage used (sum of sizes)
    const [storageRows] = await db.promise().query(
      'SELECT SUM(size) AS totalStorage FROM documents WHERE user_id = ?',
      [userId]
    );
    const totalStorage = storageRows[0].totalStorage || 0;

    // Recent uploads (top 5)
    const [recentUploadsRows] = await db.promise().query(
      'SELECT id, title, file_name, uploaded_at FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 5',
      [userId]
    );

    // Document types count
    const [typesRows] = await db.promise().query(
      'SELECT file_type, COUNT(*) AS count FROM documents WHERE user_id = ? GROUP BY file_type',
      [userId]
    );

    res.status(200).json({
      totalDocuments,
      totalStorage,
      recentUploads: recentUploadsRows,
      types: typesRows
    });
  } catch (error) {
    console.error('Dashboard Stats Error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
};