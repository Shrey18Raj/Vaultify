const db = require('../config/db');

const DocumentTag = {
  assignTag: async (documentId, tagId) => {
    const sql = `
      INSERT IGNORE INTO document_tags (document_id, tag_id)
      VALUES (?, ?)
    `;
    try {
      const [result] = await db.promise().query(sql, [documentId, tagId]);
      return result;
    } catch (err) {
      console.error('Assign Tag Error:', err);
      throw err;
    }
  },

  removeTag: async (documentId, tagId) => {
    const sql = `
      DELETE FROM document_tags WHERE document_id = ? AND tag_id = ?
    `;
    try {
      const [result] = await db.promise().query(sql, [documentId, tagId]);
      return result;
    } catch (err) {
      console.error('Remove Tag Error:', err);
      throw err;
    }
  },

  getTagsForDocument: async (documentId) => {
    const sql = `
      SELECT t.id, t.name
      FROM tags t
      JOIN document_tags dt ON t.id = dt.tag_id
      WHERE dt.document_id = ?
    `;
    try {
      const [rows] = await db.promise().query(sql, [documentId]);
      return rows;
    } catch (err) {
      console.error('Get Tags For Document Error:', err);
      throw err;
    }
  }
};

module.exports = DocumentTag;
