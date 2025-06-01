const mysql = require('mysql2/promise');

const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: 'Anis2005',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// فحص الاتصال عند بدء الخادم
const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Products server successfully connected to database');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
};

// إنشاء الجداول المطلوبة
const createTables = async () => {
    try {
        // إنشاء جدول الفئات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS categories (
                category_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT,
                image_url VARCHAR(500),
                parent_id INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (parent_id) REFERENCES categories(category_id) ON DELETE SET NULL
            )
        `);
        console.log('✅ Categories table is ready');

        // إنشاء جدول المنتجات
        await pool.execute(`
    CREATE TABLE IF NOT EXISTS products (
        product_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
                quantity INT NOT NULL DEFAULT 0,
        image_url VARCHAR(500),
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        old_price DECIMAL(10,2),
        discount_percent DECIMAL(5,2),
                visits INT DEFAULT 0,
                status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
                sku VARCHAR(50) UNIQUE,
                weight DECIMAL(10,2),
                dimensions VARCHAR(50),
                FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
            )
        `);
        console.log('✅ Products table is ready');

        // إنشاء جدول صور المنتجات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS product_images (
                image_id INT AUTO_INCREMENT PRIMARY KEY,
                product_id INT NOT NULL,
                image_url VARCHAR(500) NOT NULL,
                is_primary BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Product images table is ready');

    } catch (err) {
        console.error('❌ Error creating tables:', err);
        process.exit(1);
    }
};

// تنفيذ الفحوصات والإنشاء
(async () => {
    await checkConnection();
    await createTables();
})();

module.exports = pool;
