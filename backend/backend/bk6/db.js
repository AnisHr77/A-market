const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Anis2005',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});;

// Create orders table if it doesn't exist
const createOrdersTable = async () => {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                product_id INT,
                quantity INT,
                total_price DECIMAL(10,2),
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
                shipping_address TEXT,
                wilaya VARCHAR(50),
                commune VARCHAR(50),
                tracking_number VARCHAR(50),
                estimated_delivery_date DATE,
                actual_delivery_date DATE
            )
        `);
        console.log('✅ Orders table is ready');
    } catch (error) {
        console.error('Error creating orders table:', error);
        process.exit(1);
    }
};

createOrdersTable();

module.exports = { pool }; 