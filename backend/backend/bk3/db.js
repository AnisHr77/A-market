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

pool.query(`
    CREATE TABLE IF NOT EXISTS employees (
        employee_id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(20) NOT NULL,
        join_date DATE NOT NULL,
        role VARCHAR(100) NOT NULL,
        status ENUM('Working', 'On Leave', 'Terminated') DEFAULT 'Working',
        work_start_time DATETIME DEFAULT NULL,
        total_work_time INT DEFAULT 0
    )
`, (err) => {
    if (err) console.error('Error creating employees table:', err);
    else console.log('✅ Employees table is ready');
});

module.exports = pool.promise();