const Document = require('../models/document.model');
const Folder = require('../models/folder.model');

const DashboardController = {
    getOverview: (req, res) => {
        const userId = req.user.id;

        Document.getStatsByUser(userId, (err, statsRows) => {
            if (err) return res.status(500).json({ message: 'Error fetching documents' });
            const stats = statsRows[0];
            const types = stats.types ? stats.types.split(',') : [];

            Document.getRecentByUser(userId, 5, (err, recentDocs) => {
                if (err) return res.status(500).json({ message: 'Error fetching recent uploads' });

                Folder.findAllByUser(userId, (err, folders) => {
                    if (err) return res.status(500).json({ message: 'Error fetching folders' });

                    const typeCount = {};
                    types.forEach(type => {
                        typeCount[type] = (typeCount[type] || 0) + 1;
                    });
                    const mostCommonType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

                    res.status(200).json({
                        totalDocuments: stats.totalDocuments,
                        totalSizeMB: (stats.totalSize / (1024 * 1024)).toFixed(2),
                        folderCount: folders.length,
                        documentTypes: types, mostCommonType,
                        recentUploads: recentDocs
                    });
                });
            });
        });
    }
};

module.exports = DashboardController;