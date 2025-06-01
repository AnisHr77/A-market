const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr5')));

// Create MySQL connection pool with promises
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Anis2005',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Route: serve chat.html at root
app.get('/', (req, res) => {
    const chatFile = path.join(__dirname, '../../../frontend/frontend/fr5/chat.html');
    res.sendFile(chatFile, err => {
        if (err) {
            console.error('Error sending chat.html:', err);
            res.status(500).send('Failed to load chat page.');
        }
    });
});

// Get all users who have sent messages to admin (user_id = 1)
app.get('/api/users', async (req, res) => {
    try {
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
        const [results] = await pool.query(query);
        res.json(results);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get messages between admin (1) and other user
app.get('/api/messages/:userId', async (req, res) => {
    const currentUserId = 1; // admin id fixed
    const otherUserId = req.params.userId;

    try {
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
        const [results] = await pool.query(query, [currentUserId, otherUserId, otherUserId, currentUserId]);
        res.json(results);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ error: err.message });
    }
});

// Send a new message (from admin to user)
app.post('/api/messages', async (req, res) => {
    const sender_id = 1; // admin id fixed
    const { receiver_id, message_text } = req.body;

    if (!receiver_id || !message_text) {
        return res.status(400).json({ error: 'receiver_id and message_text are required' });
    }

    try {
        const query = `
      INSERT INTO messages (sender_id, receiver_id, message_text, sent_at, is_read)
      VALUES (?, ?, ?, NOW(), 0)
    `;
        const [result] = await pool.query(query, [sender_id, receiver_id, message_text]);
        res.json({ success: true, messageId: result.insertId });
    } catch (err) {
        console.error('Error sending message:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get unread messages count from user to admin
app.get('/api/unread-messages/:userId', async (req, res) => {
    const receiverId = 1; // admin
    const senderId = req.params.userId;

    try {
        const query = `
      SELECT COUNT(*) as count 
      FROM messages 
      WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `;
        const [results] = await pool.query(query, [senderId, receiverId]);
        res.json({ count: results[0].count });
    } catch (err) {
        console.error('Error fetching unread count:', err);
        res.status(500).json({ error: err.message });
    }
});

// Mark messages as read from user to admin
app.post('/api/mark-read/:userId', async (req, res) => {
    const receiverId = 1; // admin
    const senderId = req.params.userId;

    try {
        const query = `
      UPDATE messages 
      SET is_read = 1 
      WHERE sender_id = ? AND receiver_id = ? AND is_read = 0
    `;
        await pool.query(query, [senderId, receiverId]);
        res.json({ success: true });
    } catch (err) {
        console.error('Error marking messages read:', err);
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', '==========================================');
    console.log('\x1b[32m%s\x1b[0m', '🚀 Server is running successfully!');
    console.log('\x1b[33m%s\x1b[0m', '📱 API is available at:');
    console.log('\x1b[35m%s\x1b[0m', `   http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', '==========================================');
});
