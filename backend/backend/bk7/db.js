const mysql = require('mysql2');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Anis2005',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Create table if it doesn't exist
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

module.exports = pool.promise(); 