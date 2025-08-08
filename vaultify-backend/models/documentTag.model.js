const db = require('../config/db');

const DocumentTag = {
  assignTag: (documentId, tagId, callback) => {
    const sql = `
      INSERT IGNORE INTO document_tags (document_id, tag_id)
      VALUES (?, ?)
    `;
    db.query(sql, [documentId, tagId], callback);
  },

  removeTag: (documentId, tagId, callback) => {
    const sql = `
      DELETE FROM document_tags WHERE document_id = ? AND tag_id = ?
    `;
    db.query(sql, [documentId, tagId], callback);
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
