const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr5')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'walid',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Get all users who have sent messages to admin
app.get('/api/users', (req, res) => {
    const query = `
        SELECT DISTINCT 
            u.user_id,
            u.full_name,
            u.profile_image,
            u.type,
            u.gender,
            u.wilaya,
            u.commune,
            u.registration_date,
            (
                SELECT message_text 
                FROM messages 
                WHERE sender_id = u.user_id 
                AND receiver_id = 1 
                ORDER BY sent_at DESC 
                LIMIT 1
            ) as last_message,
            (
                SELECT sent_at 
                FROM messages 
                WHERE sender_id = u.user_id 
                AND receiver_id = 1 
                ORDER BY sent_at DESC 
                LIMIT 1
            ) as last_message_time,
            (
                SELECT COUNT(*) 
                FROM messages 
                WHERE sender_id = u.user_id 
                AND receiver_id = 1 
                AND is_read = 0
            ) as unread_count
        FROM users u
        INNER JOIN messages m ON u.user_id = m.sender_id
        WHERE m.receiver_id = 1
        ORDER BY last_message_time DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Get messages between two users
app.get('/api/messages/:userId', (req, res) => {
    const currentUserId = 1; // Always use admin ID 1
    const otherUserId = req.params.userId;
    
    const query = `
        SELECT m.*, 
               s.full_name as sender_name,
               r.full_name as receiver_name
        FROM messages m 
        JOIN users s ON m.sender_id = s.user_id 
        JOIN users r ON m.receiver_id = r.user_id 
        WHERE (m.sender_id = ? AND m.receiver_id = ?) 
        OR (m.sender_id = ? AND m.receiver_id = ?)
        ORDER BY m.sent_at ASC
    `;
    
    db.query(query, [currentUserId, otherUserId, otherUserId, currentUserId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// Send a new message
app.post('/api/messages', (req, res) => {
    const { receiver_id, message_text } = req.body;
    const sender_id = 1; // Always use admin ID 1
    
    const query = `
        INSERT INTO messages (sender_id, receiver_id, message_text, sent_at, is_read)
        VALUES (?, ?, ?, NOW(), 0)
    `;
    
    db.query(query, [sender_id, receiver_id, message_text], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true, messageId: result.insertId });
    });
});

// Get unread messages count
app.get('/api/unread-messages/:userId', (req, res) => {
    const receiverId = 1; // Admin ID
    const senderId = req.params.userId;
    
    const query = `
        SELECT COUNT(*) as count 
        FROM messages 
        WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `;
    
    db.query(query, [senderId, receiverId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ count: results[0].count });
    });
});

// Mark messages as read
app.post('/api/mark-read/:userId', (req, res) => {
    const receiverId = 1; // Admin ID
    const senderId = req.params.userId;
    
    const query = `
        UPDATE messages 
        SET is_read = 1 
        WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `;
    
    db.query(query, [senderId, receiverId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Serve chat.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr5/chat.html'));
});

// Start server
const PORT = 3004;
app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', '==========================================');
    console.log('\x1b[32m%s\x1b[0m', '🚀 Server is running successfully!');
    console.log('\x1b[33m%s\x1b[0m', `📱 API is available at:`);
    console.log('\x1b[35m%s\x1b[0m', `   http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', '==========================================');
}); 