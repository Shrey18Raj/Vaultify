const Tag = require('../models/tag.model');
const DocumentTag = require('../models/documentTag.model');

exports.createTag = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Tag name is required.' });

        const result = await new Promise((resolve, reject) => {
            Tag.create(userId, name, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        res.status(201).json({ message: 'Tag created successfully', tagId: result.insertId });
    } catch (err) {
        console.error('Create Tag Error:', err);
        res.status(500).json({ error: 'Failed to create tag' });
    }
};

exports.getTags = async (req, res) => {
    try {
        const userId = req.user.id;
        const tags = await new Promise((resolve, reject) => {
            Tag.getAll(userId, (err, tags) => {
                if (err) return reject(err);
                resolve(tags);
            });
        });

        res.status(200).json({ tags });
    } catch (err) {
        console.error('Get Tags Error:', err);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
};

exports.updateTag = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { name } = req.body;

        if (!name) return res.status(400).json({ error: 'New tag name is required' });

        await new Promise((resolve, reject) => {
            Tag.update(userId, id, name, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: 'Tag updated successfully' });
    } catch (err) {
        console.error('Update Tag Error:', err);
        res.status(500).json({ error: 'Failed to update tag' });
    }
};

exports.deleteTag = async (req, res) => {
    try {
        const userId = req.user.id;
        const { id } = req.params;

        await new Promise((resolve, reject) => {
            Tag.delete(userId, id, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (err) {
        console.error('Delete Tag Error:', err);
        res.status(500).json({ error: 'Failed to delete tag' });
    }
};

exports.assignTagToDocument = async (req, res) => {
    try {
        const { documentId, tagId } = req.body;
        if (!documentId || !tagId) {
            return res.status(400).json({ message: 'documentId and tagId are required.' });
        }

        await new Promise((resolve, reject) => {
            DocumentTag.assignTag(documentId, tagId, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: 'Tag assigned successfully.' });
    } catch (err) {
        console.error('Assign Tag Error:', err);
        res.status(500).json({ message: 'Failed to assign tag.' });
    }
};

exports.removeTagFromDocument = async (req, res) => {
    try {
        const { documentId, tagId } = req.body;
        if (!documentId || !tagId) {
            return res.status(400).json({ message: 'documentId and tagId are required.' });
        }

        await new Promise((resolve, reject) => {
            DocumentTag.removeTag(documentId, tagId, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        res.status(200).json({ message: 'Tag removed successfully.' });
    } catch (err) {
        console.error('Remove Tag Error:', err);
        res.status(500).json({ message: 'Failed to remove tag.' });
    }
};

exports.getTagsForDocument = async (req, res) => {
    try {
        const { documentId } = req.params;
        const tags = await new Promise((resolve, reject) => {
            DocumentTag.getTagsForDocument(documentId, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });

        res.status(200).json(tags);
    } catch (err) {
        console.error('Get Tags For Document Error:', err);
        res.status(500).json({ message: 'Failed to fetch tags.' });
    }
};
