const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'walid',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create users table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        gmail VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        age INT,
        wilaya VARCHAR(50),
        commune VARCHAR(50),
        gender ENUM('male', 'female'),
        type ENUM('user', 'admin') DEFAULT 'user',
        profile_image VARCHAR(255),
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) {
        console.error('Error creating users table:', err);
    } else {
        console.log('Users table ready');
    }
});

// Create messages table if it doesn't exist
pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
        message_id INT AUTO_INCREMENT PRIMARY KEY,
        sender_id INT NOT NULL,
        receiver_id INT NOT NULL,
        message_text TEXT NOT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_read TINYINT(1) DEFAULT 0,
        FOREIGN KEY (sender_id) REFERENCES users(user_id),
        FOREIGN KEY (receiver_id) REFERENCES users(user_id)
    )
`, (err) => {
    if (err) {
        console.error('Error creating messages table:', err);
    } else {
        console.log('Messages table ready');
    }
});

module.exports = pool.promise(); 