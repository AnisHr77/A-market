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
        console.log('✅ Orders server successfully connected to database');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
};

// إنشاء الجداول المطلوبة
const createTables = async () => {
    try {
        // إنشاء جدول الطلبات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                total_amount DECIMAL(10,2) NOT NULL,
                shipping_address TEXT NOT NULL,
                wilaya VARCHAR(50) NOT NULL,
                commune VARCHAR(50) NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
                tracking_number VARCHAR(50),
                estimated_delivery_date DATE,
                actual_delivery_date DATE,
                payment_method ENUM('cash', 'credit_card', 'bank_transfer') DEFAULT 'cash',
                payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
                notes TEXT,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Orders table is ready');

        // إنشاء جدول تفاصيل الطلبات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS order_items (
                item_id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                unit_price DECIMAL(10,2) NOT NULL,
                total_price DECIMAL(10,2) NOT NULL,
                discount_amount DECIMAL(10,2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT
            )
        `);
        console.log('✅ Order items table is ready');

        // إنشاء جدول تتبع الطلبات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS order_tracking (
                tracking_id INT AUTO_INCREMENT PRIMARY KEY,
                order_id INT NOT NULL,
                status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL,
                status_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                location VARCHAR(100),
                notes TEXT,
                updated_by ENUM('system', 'admin', 'user') DEFAULT 'system',
                FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Order tracking table is ready');

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

module.exports = { pool }; 