const Document = require('../models/document.model');
const Folder = require('../models/folder.model');

const DashboardController = {
    getOverview: async (req, res) => {
        try {
            const userId = req.user.id;

            // Fetch document stats
            const statsRows = await new Promise((resolve, reject) => {
                Document.getStatsByUser(userId, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            const stats = statsRows[0];
            const types = stats.types ? stats.types.split(',') : [];

            // Fetch recent documents
            const recentDocs = await new Promise((resolve, reject) => {
                Document.getRecentByUser(userId, 5, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            // Fetch folders
            const folders = await new Promise((resolve, reject) => {
                Folder.findAllByUser(userId, (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                });
            });

            // Calculate most common document type
            const typeCount = types.reduce((acc, type) => {
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            }, {});
            const mostCommonType = Object.entries(typeCount)
                .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

            res.status(200).json({
                totalDocuments: stats.totalDocuments,
                totalSizeMB: (stats.totalSize / (1024 * 1024)).toFixed(2),
                folderCount: folders.length,
                documentTypes: types,
                mostCommonType,
                recentUploads: recentDocs
            });

        } catch (error) {
            console.error('Dashboard Error:', error);
            res.status(500).json({ message: 'Failed to fetch dashboard data' });
        }
    }
};

module.exports = DashboardController;
