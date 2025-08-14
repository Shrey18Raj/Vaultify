const Folder = require('../models/folder.model');
const db = require('../config/db');

const FolderController = {
    createFolder: async (req, res) => {
        try {
            const { name } = req.body;
            if (!name || name.trim() === '') {
                return res.status(400).json({ message: 'Folder name is required' });
            }

            const result = await new Promise((resolve, reject) => {
                Folder.create(req.user.id, name.trim(), (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            res.status(201).json({
                message: 'Folder created successfully',
                folderId: result.insertId
            });

        } catch (err) {
            console.error('Create Folder Error:', err);
            res.status(500).json({ message: 'Error creating folder' });
        }
    },

    getFolders: async (req, res) => {
        try {
            const folders = await new Promise((resolve, reject) => {
                Folder.findAllByUser(req.user.id, (err, folders) => {
                    if (err) return reject(err);
                    resolve(folders);
                });
            });

            res.status(200).json({ folders });

        } catch (err) {
            console.error('Get Folders Error:', err);
            res.status(500).json({ message: 'Error fetching folders' });
        }
    },

    deleteFolder: async (req, res) => {
        try {
            const folderId = parseInt(req.params.id);
            if (isNaN(folderId)) {
                return res.status(400).json({ message: 'Invalid folder ID' });
            }

            const folder = await new Promise((resolve, reject) => {
                Folder.findByIdAndUser(folderId, req.user.id, (err, folder) => {
                    if (err) return reject(err);
                    resolve(folder);
                });
            });

            if (!folder) {
                return res.status(404).json({ message: 'Folder not found or unauthorized' });
            }

            await new Promise((resolve, reject) => {
                Folder.delete(folderId, req.user.id, (err) => {
                    if (err) return reject(err);
                    resolve();
                });
            });

            // Set folder_id to NULL for documents in deleted folder
            const sql = 'UPDATE documents SET folder_id = NULL WHERE folder_id = ?';
            await db.promise().query(sql, [folderId]);

            res.status(200).json({ message: 'Folder deleted successfully' });

        } catch (err) {
            console.error('Delete Folder Error:', err);
            res.status(500).json({ message: 'Error deleting folder' });
        }
    }
};

module.exports = FolderController;
