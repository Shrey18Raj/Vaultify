const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const Document = require('../models/document.model');

const ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'vaultify2025', 'salt', 32);
const IV_LENGTH = 16;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encryptedData: encrypted, iv: iv.toString('hex') };
}

const DocumentController = {
  uploadFile: (req, res) => {
    upload(req, res, (err) => {
      if (err || !req.file) {
        return res.status(400).json({ message: 'File upload failed' });
      }

      const { originalname, mimetype, size, buffer } = req.file;
      const { encryptedData, iv } = encryptBuffer(buffer);
      const filename = `${Date.now()}_${originalname}.enc`;

      const filePath = path.join(__dirname, '..', 'uploads', filename);
      fs.writeFileSync(filePath, encryptedData);

      Document.create(
        req.user.id,
        filename,
        originalname,
        mimetype,
        size,
        iv,
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error saving file metadata' });
          }

          res.status(201).json({
            message: 'File uploaded and encrypted successfully',
            file: {
              name: originalname,
              stored_as: filename,
              mimetype,
              size,
              iv
            }
          });
        }
      );
    });
  },

  Document.getByFilename = (filename, callback) => {
  const sql = 'SELECT * FROM documents WHERE filename = ?';
  db.query(sql, [filename], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results.length > 0 ? results[0] : null);
  });
};

};

module.exports = DocumentController;
