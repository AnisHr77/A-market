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
        console.log('✅ Login server successfully connected to database');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
};

// إنشاء الجداول المطلوبة
const createTables = async () => {
    try {
        // إنشاء جدول المستخدمين
        await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        gmail VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
                phone_number VARCHAR(20) NOT NULL,
        age INT,
        wilaya VARCHAR(50),
        commune VARCHAR(50),
                gender ENUM('male', 'female') NOT NULL,
        type ENUM('user', 'admin') DEFAULT 'user',
        profile_image VARCHAR(255),
                registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP NULL,
                status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
                email_verified BOOLEAN DEFAULT FALSE,
                verification_token VARCHAR(255),
                reset_password_token VARCHAR(255),
                reset_password_expires TIMESTAMP NULL,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Users table is ready');

        // إنشاء جدول جلسات المستخدمين
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS user_sessions (
                session_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                token VARCHAR(255) NOT NULL,
                device_info VARCHAR(255),
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                is_active BOOLEAN DEFAULT TRUE,
                last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ User sessions table is ready');

        // إنشاء جدول سجل تسجيل الدخول
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS login_history (
                history_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                ip_address VARCHAR(45),
                device_info VARCHAR(255),
                status ENUM('success', 'failed') NOT NULL,
                failure_reason VARCHAR(255),
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Login history table is ready');

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