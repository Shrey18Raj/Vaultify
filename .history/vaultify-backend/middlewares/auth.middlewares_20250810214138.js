const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const JWT_SECRET = process.env.JWT_SECRET || 'vaultifySuperSecretKey2025';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access token missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token'});

        User.findById(decoded.id, (err, user) => {
            if (err || !user) return res.status(404).json({ message: 'User not found' });
            req.user = user;
            next();
        });
    });
}

module.exports = authenticateToken;