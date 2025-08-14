const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user.model');

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required.' });

  User.getByEmail(email, async (err, rows) => {
    if (err) return res.status(500).json({ message: 'DB error.' });
    if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials.' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token });
  });
};

// GET PROFILE
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query(
      'SELECT firstname, lastname, email, phone, password, profile_picture FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    res.status(200).json({
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email,
      phone: user.phone || '',
      password: user.password || '',
      profilePicture: user.profile_picture || ''
    });
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { firstname, lastname, phone, password, profilePicture } = req.body;

  try {
    let hashedPassword = null;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const fields = [];
    const values = [];

    if (firstname !== undefined) { fields.push('firstname = ?'); values.push(firstname); }
    if (lastname !== undefined) { fields.push('lastname = ?'); values.push(lastname); }
    if (phone !== undefined) { fields.push('phone = ?'); values.push(phone); }
    if (hashedPassword !== null) { fields.push('password = ?'); values.push(hashedPassword); }
    if (profilePicture !== undefined) { fields.push('profile_picture = ?'); values.push(profilePicture); }

    if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });

    values.push(userId);
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await db.promise().query(sql, values);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /me endpoint
exports.getMe = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.promise().query(
      'SELECT firstname, lastname, email, phone, profile_picture FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = rows[0];
    res.status(200).json({
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      email: user.email,
      phone: user.phone || '',
      profilePicture: user.profile_picture || ''
    });
  } catch (error) {
    console.error('GetMe Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};