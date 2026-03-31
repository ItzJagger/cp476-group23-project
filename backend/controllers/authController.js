const db = require('../db/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

// Helper: MD5 hash with salt (matches existing DB scheme)
const hashPassword = (password, salt) => {
    return crypto.createHash('md5').update(password + salt).digest('hex');
};

// Helper: generate random 16-char salt
const generateSalt = () => {
    return crypto.randomBytes(8).toString('base64').slice(0, 16);
};

// POST /api/auth/register
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    try {
        // Check if username or email already exists
        const [existing] = await db.execute(
            'SELECT username FROM userlogin WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existing.length > 0) {
            return res.status(409).json({ error: 'Username or email already taken.' });
        }

        const salt = generateSalt();
        const hash = hashPassword(password, salt);

        // Insert into userlogin
        await db.execute(
            'INSERT INTO userlogin (username, email, hash, salt) VALUES (?, ?, ?, ?)',
            [username, email, hash, salt]
        );

        // Insert into profile (created automatically on register)
        await db.execute(
            'INSERT INTO profile (username, credits) VALUES (?, ?)',
            [username, 100] // give new users 100 credits to start
        );

        const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { username, email, credits: 100 }
        });

    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

// POST /api/auth/login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT u.username, u.email, u.hash, u.salt, p.credits FROM userlogin u JOIN profile p ON u.username = p.username WHERE u.username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const user = rows[0];
        const hash = hashPassword(password, user.salt);

        if (hash !== user.hash) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = jwt.sign(
            { username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                username: user.username,
                email: user.email,
                credits: user.credits
            }
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

// POST /api/auth/logout
exports.logout = (req, res) => {
    // JWT is stateless — client just discards the token
    res.json({ message: 'Logged out successfully.' });
};

// GET /api/auth/me
exports.getCurrentUser = async (req, res) => {
    try {
        const [rows] = await db.execute(
            'SELECT u.username, u.email, p.avatar, p.birthday, p.credits, p.review_count FROM userlogin u JOIN profile p ON u.username = p.username WHERE u.username = ?',
            [req.user.username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ user: rows[0] });

    } catch (err) {
        console.error('Get current user error:', err);
        res.status(500).json({ error: 'Server error.' });
    }
};