const db = require('../config/db');

const DocumentTag = {
  assignTag: (documentId, tagId, callback) => {
    db.query('INSERT IGNORE INTO document_tags (document_id, tag_id) VALUES (?, ?)', [documentId, tagId], callback);
  },

  removeTag: (documentId, tagId, callback) => {
    db.query('DELETE FROM document_tags WHERE document_id = ? AND tag_id = ?', [documentId, tagId], callback);
  },

  getTagsForDocument: (documentId, callback) => {
    const sql = `
      SELECT t.id, t.name
      FROM tags t
      JOIN document_tags dt ON t.id = dt.tag_id
      WHERE dt.document_id = ?
    `;
    db.query(sql, [documentId], callback);
  }
};

module.exports = DocumentTag;