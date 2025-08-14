const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const Document = require('../models/document.model');

// --- Encryption Configuration ---
const ENCRYPTION_KEY = crypto.scryptSync(process.env.ENCRYPTION_SECRET || 'vaultify2025', 'salt', 32);
const IV_LENGTH = 16;

// --- Multer Setup ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

// --- Encryption Helper ---
function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  return { encryptedData: encrypted, iv: iv.toString('hex') };
}

const DocumentController = {
  // 📤 Upload & Encrypt
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

  // 🗂️ List Documents
  getMyDocuments: (req, res) => {
    Document.findByUser(req.user.id, (err, documents) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(200).json({ documents });
    });
  },

  // 🔽 Download & Decrypt
  downloadFile: (req, res) => {
    const filename = req.params.filename;

    Document.getByFilename(filename, (err, fileRecord) => {
      if (err || !fileRecord) {
        return res.status(404).json({ message: 'File not found' });
      }

      if (fileRecord.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      const filePath = path.join(__dirname, '..', 'uploads', fileRecord.filename);
      const iv = Buffer.from(fileRecord.iv, 'hex');

      const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
      const readStream = fs.createReadStream(filePath);

      res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.original_name}"`);
      res.setHeader('Content-Type', fileRecord.mimetype);

      readStream.pipe(decipher).pipe(res);
    });
  }
};

module.exports = DocumentController;