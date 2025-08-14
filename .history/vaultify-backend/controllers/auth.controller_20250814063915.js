const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

const AuthController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            // Basic email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            // Password strength validation (example: min 6 chars)
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters' });
            }

            // Check if user already exists
            const existingUser = await new Promise((resolve, reject) => {
                User.findByEmail(email, (err, user) => {
                    if (err) return reject(err);
                    resolve(user);
                });
            });

            if (existingUser) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            // Hash password asynchronously
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            await new Promise((resolve, reject) => {
                User.create(name, email, hashedPassword, (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            return res.status(201).json({ message: 'User registered successfully' });

        } catch (error) {
            console.error('Register Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password required' });
            }

            // Find user by email
            const user = await new Promise((resolve, reject) => {
                User.findByEmail(email, (err, user) => {
                    if (err) return reject(err);
                    resolve(user);
                });
            });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Compare password asynchronously
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });

        } catch (error) {
            console.error('Login Error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = AuthController;
