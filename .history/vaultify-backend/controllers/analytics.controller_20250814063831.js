const db = require('../config/db');

exports.getAnalyticsSummary = async (req, res) => {
  try {
    const [
      [docCountRows], [folderCount], [tagCount],
      docTypes, topTags, recentDocs
    ] = await Promise.all([
      db.promise().query('SELECT COUNT(*) AS totalDocuments FROM documents'),
      db.promise().query('SELECT COUNT(*) AS totalFolders FROM folders'),
      db.promise().query('SELECT COUNT(*) AS totalTags FROM tags'),
      db.promise().query(`
        SELECT file_type, COUNT(*) AS count 
        FROM documents GROUP BY file_type
      `),
      db.promise().query(`
        SELECT t.name, COUNT(*) AS usage_count
        FROM document_tags dt
        JOIN tags t ON dt.tag_id = t.id
        GROUP BY t.name ORDER BY usage_count DESC LIMIT 5
      `),
      db.promise().query(`
        SELECT id, title, uploaded_at 
        FROM documents ORDER BY uploaded_at DESC LIMIT 5
      `)
    ]);

    res.status(200).json({
      totalDocuments: docCount[0].totalDocuments,
      totalFolders: folderCount[0].totalFolders,
      totalTags: tagCount[0].totalTags,
      documentsPerType: docTypes[0],
      topTags: topTags[0],
      recentUploads: recentDocs[0]
    });

  } catch (error) {
    console.error('Analytics Error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics data' });
  }
};
