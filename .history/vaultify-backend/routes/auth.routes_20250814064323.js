const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const JWT_SECRET = process.env.JWT_SECRET || 'vaultifySuperSecretKey2025';

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create(name, email, hashedPassword);

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Register Error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await User.findByEmail(email);
            if (!user) return res.status(401).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

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
        } catch (err) {
            console.error('Login Error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = AuthController;
