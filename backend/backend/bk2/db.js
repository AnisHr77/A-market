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

// اختبار الاتصال
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('✅ Successfully connected to database');
    connection.release();
});

// إنشاء جدول categories إذا لم يكن موجودًا
pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
        category_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE
    )
`, (err) => {
    if (err) {
        console.error('Error creating categories table:', err);
        process.exit(1);
    }
    console.log('✅ Categories table is ready');
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
        visits INT DEFAULT 0,
        FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
    )
`, (err) => {
    if (err) {
        console.error('Error creating products table:', err);
        process.exit(1);
    }
    console.log('✅ Products table is ready');
});

// إنشاء جدول site_images إذا لم يكن موجودًا
pool.query(`
    CREATE TABLE IF NOT EXISTS site_images (
        id INT PRIMARY KEY DEFAULT 1,
        banner1 VARCHAR(500) DEFAULT '',
        banner2 VARCHAR(500) DEFAULT '',
        banner3 VARCHAR(500) DEFAULT '',
        prd1 VARCHAR(500) DEFAULT '',
        prd2 VARCHAR(500) DEFAULT '',
        prd3 VARCHAR(500) DEFAULT '',
        prd4 VARCHAR(500) DEFAULT '',
        prd5 VARCHAR(500) DEFAULT '',
        prd6 VARCHAR(500) DEFAULT ''
    )
`, (err) => {
    if (err) {
        console.error('Error creating site_images table:', err);
        process.exit(1);
    }
    console.log('✅ Site images table is ready');
    // إدخال صف افتراضي إذا لم يكن موجودًا
    pool.query(`
        INSERT IGNORE INTO site_images (id) VALUES (1)
    `, (err) => {
        if (err) {
            console.error('Error inserting default site_images row:', err);
            process.exit(1);
        }
        console.log('✅ Default site_images row is ready');
    });
});

module.exports = pool.promise(); 