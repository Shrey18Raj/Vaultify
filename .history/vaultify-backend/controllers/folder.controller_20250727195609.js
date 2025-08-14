const Folder = require('../models/folder.model');
const Document = require('../models/document.model');
const db = require('../config/db');

const FolderController = {
    createFolder: (req, res) => {
        const { name } = req.body;
        if(!name || name.trim() === '') {
            return res.status(400).json({ message: 'Folder name is required' });
        }

        Folder.create(req.user.id, name.trim(), (err, result) => {
            if (err) return res.status(500).json({ message: 'Error creating folder' });

            res.status(201).json({
                message: 'Folder created successfully',
                folderId: result.insertId
            });
        });
    },

    getFolders: (req, res) => {
        Folder.findAllByUser(req.user.id, (err, folders) => {
            if (err) return res.status(500).json({ message: 'Error fetching folders' });
            res.status(200).json({ folders });
        });
    },

    deleteFolder: (req, res) => {
        const folderId = parseInt(req.params.id);

        Folder.findByIdAndUser(folderId, req.user.id, (err, folder) => {
            if (err || !folder) {
                return res.status(404).json({ message: 'Folder not found or unauthorized'});
            }

            Folder.delete(folderId, req.user.id, (err) => {
                if (err) return res.status(500).json({ message: 'Error deleting folder' });

                const sql = 'UPDATE documents SET folder_id = NULL WHERE folder_id = ?';
                db.query(sql, [folderId], () => {
                    res.status(200).json({ message: 'Folder deleted successfully' });
                });
            });
        });
    }
};

module.exports = FolderController;