const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

async function authenticateToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access token missing' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user
        const user = await new Promise((resolve, reject) => {
            User.findById(decoded.id, (err, user) => {
                if (err) return reject(err);
                resolve(user);
            });
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error('Authentication Error:', err);
        // Differentiate expired/invalid token
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateToken;
