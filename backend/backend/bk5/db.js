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
        console.log('✅ Chat server successfully connected to database');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
};

// إنشاء الجداول المطلوبة
const createTables = async () => {
    try {
        // إنشاء جدول المحادثات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS conversations (
                conversation_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                employee_id INT,
                status ENUM('active', 'closed', 'pending') DEFAULT 'active',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                subject VARCHAR(255),
                priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
            )
        `);
        console.log('✅ Conversations table is ready');

        // إنشاء جدول الرسائل
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS messages (
                message_id INT AUTO_INCREMENT PRIMARY KEY,
                conversation_id INT NOT NULL,
                sender_id INT NOT NULL,
                sender_type ENUM('user', 'employee') NOT NULL,
                message_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_read BOOLEAN DEFAULT FALSE,
                attachments JSON,
                FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Messages table is ready');

        // إنشاء جدول الإشعارات
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS chat_notifications (
                notification_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                conversation_id INT NOT NULL,
                message_id INT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (conversation_id) REFERENCES conversations(conversation_id) ON DELETE CASCADE,
                FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Chat notifications table is ready');

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