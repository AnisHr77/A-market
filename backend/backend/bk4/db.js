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

// إنشاء جدول users إذا لم يكن موجودًا
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
        profile_image VARCHAR(255),
        registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`, (err) => {
    if (err) console.error('Error creating users table:', err);
    else console.log('✅ Users table is ready');
});

// إنشاء جدول products إذا لم يكن موجودًا
pool.query(`
    CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        quantity INT NOT NULL,
        image_url VARCHAR(500),
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        old_price DECIMAL(10,2),
        discount_percent DECIMAL(5,2),
        visits INT DEFAULT 0
    )
`, (err) => {
    if (err) console.error('Error creating products table:', err);
    else console.log('✅ Products table is ready');
});

module.exports = pool.promise();
