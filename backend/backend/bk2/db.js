const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'walid',
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
        console.log('✅ Customize server successfully connected to database');
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
                FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
            )
        `);
        console.log('✅ Products table is ready');

        // إنشاء جدول site_images
        await pool.execute(`
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
                prd6 VARCHAR(500) DEFAULT '',
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Site images table is ready');

        // إدخال صف افتراضي إذا لم يكن موجودًا
        await pool.execute(`
            INSERT IGNORE INTO site_images (id) VALUES (1)
        `);
        console.log('✅ Default site_images row is ready');

        // إنشاء جدول customization_settings
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS customization_settings (
                id INT PRIMARY KEY DEFAULT 1,
                theme_color VARCHAR(20) DEFAULT '#3b82f6',
                font_family VARCHAR(50) DEFAULT 'Poppins',
                header_style VARCHAR(20) DEFAULT 'default',
                sidebar_style VARCHAR(20) DEFAULT 'default',
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Customization settings table is ready');

        // إدخال إعدادات افتراضية إذا لم تكن موجودة
        await pool.execute(`
            INSERT IGNORE INTO customization_settings (id) VALUES (1)
        `);
        console.log('✅ Default customization settings are ready');

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