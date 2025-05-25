const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image'));
        }
        cb(null, true);
    }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // التحقق من التوكن الوهمي للمستخدم 2
        if (token === 'mock_token_for_user_2') {
            req.user = { id: 2 }; // تعيين معرف المستخدم 2
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Database connection successful', data: rows[0] });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to A+ Market Backend API' });
});

// Register route
app.post('/api/register', upload.single('profileImage'), async (req, res) => {
    try {
        const { username, email, password, phoneNumber, age, wilaya, commune, gender } = req.body;
        
        // Check if email already exists
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE gmail = ?', [email]);
        if (existingUsers.length > 0) {
            return res.json({ success: false, message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Prepare profile image path
        const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

        // Insert user into database
        const [result] = await pool.query(
            'INSERT INTO users (full_name, gmail, user_password, phone_number, age, wilaya, commune, gender, profile_image, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [username, email, hashedPassword, phoneNumber, age, wilaya, commune, gender, profileImage, 'user']
        );

        // Get the inserted user (excluding password)
        const [newUser] = await pool.query(
            'SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, type, registration_date FROM users WHERE user_id = ?',
            [result.insertId]
        );

        res.json({ 
            success: true, 
            message: 'Registration successful!',
            user: newUser[0]
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.json({ success: false, message: 'Registration failed. Please try again.' });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get user from database
        const [users] = await pool.query('SELECT * FROM users WHERE gmail = ?', [email]);
        
        if (users.length === 0) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        const user = users[0];

        // Check password
        const validPassword = await bcrypt.compare(password, user.user_password);
        if (!validPassword) {
            return res.json({ success: false, message: 'Invalid email or password' });
        }

        // Remove password from user object
        const { user_password, ...userWithoutPassword } = user;

        res.json({ 
            success: true, 
            message: 'Login successful!',
            user: userWithoutPassword 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.json({ success: false, message: 'Login failed. Please try again.' });
    }
});

// Get user profile (protected route)
app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        const [users] = await pool.query(
            'SELECT user_id, full_name, gmail, phone_number, age, wilaya, commune, gender, profile_image, type FROM users WHERE user_id = ?',
            [req.user.id]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Error fetching profile' });
    }
});

// Get all users (for chat)
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT user_id, full_name, profile_image FROM users WHERE user_id != ?', [req.user.id]);
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Get messages between two users
app.get('/api/messages/:userId', verifyToken, async (req, res) => {
    try {
        const [messages] = await pool.query(
            `SELECT * FROM messages 
            WHERE (sender_id = ? AND receiver_id = ?) 
            OR (sender_id = ? AND receiver_id = ?)
            ORDER BY sent_at ASC`,
            [req.user.id, req.params.userId, req.params.userId, req.user.id]
        );
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Send a message
app.post('/api/messages', verifyToken, async (req, res) => {
    try {
        const { receiver_id, message_text } = req.body;
        const [result] = await pool.query(
            'INSERT INTO messages (sender_id, receiver_id, message_text) VALUES (?, ?, ?)',
            [req.user.id, receiver_id, message_text]
        );
        res.status(201).json({ messageId: result.insertId });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

// Mark messages as read
app.post('/api/mark-read/:userId', verifyToken, async (req, res) => {
    try {
        await pool.query(
            'UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ? AND is_read = 0',
            [req.params.userId, req.user.id]
        );
        res.json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ message: 'Error marking messages as read' });
    }
});

// Get unread message count
app.get('/api/unread-messages/:userId', verifyToken, async (req, res) => {
    try {
        const [result] = await pool.query(
            'SELECT COUNT(*) as count FROM messages WHERE sender_id = ? AND receiver_id = ? AND is_read = 0',
            [req.params.userId, req.user.id]
        );
        res.json({ count: result[0].count });
    } catch (error) {
        console.error('Error getting unread count:', error);
        res.status(500).json({ message: 'Error getting unread count' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 