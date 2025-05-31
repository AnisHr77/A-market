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
        console.log('✅ Staff server successfully connected to database');
        connection.release();
    } catch (err) {
        console.error('❌ Error connecting to database:', err);
        process.exit(1);
    }
};

// إنشاء الجداول المطلوبة
const createTables = async () => {
    try {
        // إنشاء جدول الموظفين
        await pool.execute(`
    CREATE TABLE IF NOT EXISTS employees (
        employee_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(20) NOT NULL,
        join_date DATE NOT NULL,
        role VARCHAR(100) NOT NULL,
        status ENUM('Working', 'On Leave', 'Terminated') DEFAULT 'Working',
        work_start_time DATETIME DEFAULT NULL,
                total_work_time INT DEFAULT 0,
                last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                profile_image VARCHAR(255),
                department VARCHAR(50),
                salary DECIMAL(10,2),
                emergency_contact VARCHAR(100),
                address TEXT,
                notes TEXT
            )
        `);
        console.log('✅ Employees table is ready');

        // إنشاء جدول ساعات العمل
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS work_hours (
                id INT AUTO_INCREMENT PRIMARY KEY,
                employee_id INT NOT NULL,
                date DATE NOT NULL,
                start_time DATETIME NOT NULL,
                end_time DATETIME,
                total_hours DECIMAL(5,2),
                status ENUM('Present', 'Absent', 'Late', 'Half Day') DEFAULT 'Present',
                notes TEXT,
                FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
            )
        `);
        console.log('✅ Work hours table is ready');

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