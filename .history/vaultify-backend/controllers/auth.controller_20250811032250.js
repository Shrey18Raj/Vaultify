const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const JWT_SECRET = process.env.JWT_SECRET || 'vaultifySuperSecretKey2025';

const AuthController = {
    register: (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        User.findByEmail(email, (err, user) => {
            if (err) return res.status(500).json({ message: 'DB error' });
            if (user) return res.status(409).json({ message: 'Email already exists' });

            const hashedPassword = bcrypt.hashSync(password, 10);

            User.create(name, email, hashedPassword, (err, result) => {
                if (err) return res.status(500).json({ message: 'Error creating user' });
                return res.status(201).json({ message: 'User registered successfully' });
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        User.findByEmail(email, (err, user) => {
            if (err) return res.status(500).json({ message: 'DB error' });
            if (!user) return res.status(401).json({ message: 'Invalid Credentials' });

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid Credentials' });

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });

            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    }
};

module.exports = AuthController;