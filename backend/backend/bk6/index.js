const express = require('express');
const path = require('path');
const { pool } = require('./db');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr6')));

// Routes
app.get('/api/orders', async (req, res) => {
    try {
        const query = `
            SELECT 
                o.order_id,
                o.user_id,
                o.product_id,
                o.quantity,
                o.total_price,
                DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i:%s') as order_date,
                o.status,
                o.shipping_address,
                o.wilaya,
                o.commune,
                o.tracking_number,
                DATE_FORMAT(o.estimated_delivery_date, '%Y-%m-%d') as estimated_delivery_date,
                DATE_FORMAT(o.actual_delivery_date, '%Y-%m-%d') as actual_delivery_date,
                u.full_name as customer_name,
                p.name as product_name,
                p.price as product_price,
                p.image_url as product_image
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.user_id
            LEFT JOIN products p ON o.product_id = p.product_id
            ORDER BY o.order_date DESC
        `;
        
        const [rows] = await pool.execute(query);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/orders/:orderId', async (req, res) => {
    try {
        const query = `
            SELECT 
                o.order_id,
                o.user_id,
                o.product_id,
                o.quantity,
                o.total_price,
                DATE_FORMAT(o.order_date, '%Y-%m-%d %H:%i:%s') as order_date,
                o.status,
                o.shipping_address,
                o.wilaya,
                o.commune,
                o.tracking_number,
                DATE_FORMAT(o.estimated_delivery_date, '%Y-%m-%d') as estimated_delivery_date,
                DATE_FORMAT(o.actual_delivery_date, '%Y-%m-%d') as actual_delivery_date,
                u.full_name as customer_name,
                p.name as product_name,
                p.price as product_price,
                p.image_url as product_image
            FROM orders o
            LEFT JOIN users u ON o.user_id = u.user_id
            LEFT JOIN products p ON o.product_id = p.product_id
            WHERE o.order_id = ?
        `;
        const [rows] = await pool.execute(query, [req.params.orderId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/orders/:orderId/status', async (req, res) => {
    const { status, tracking_number, estimated_delivery_date } = req.body;
    const orderId = req.params.orderId;

    try {
        // First, get the current order status
        const [currentOrder] = await pool.execute(
            'SELECT status FROM orders WHERE order_id = ?',
            [orderId]
        );

        if (currentOrder.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Prepare the update query
        let updateQuery = `
            UPDATE orders 
            SET status = ?,
                tracking_number = ?,
                estimated_delivery_date = ?
        `;

        // If status is changing to 'delivered', update actual_delivery_date
        if (status === 'delivered' && currentOrder[0].status !== 'delivered') {
            updateQuery += `, actual_delivery_date = CURRENT_DATE()`;
        }

        updateQuery += ` WHERE order_id = ?`;

        // Execute the update
        const [result] = await pool.execute(updateQuery, [
            status,
            tracking_number,
            estimated_delivery_date,
            orderId
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Get the updated order
        const [updatedOrder] = await pool.execute(`
            SELECT 
                order_id,
                user_id,
                product_id,
                quantity,
                total_price,
                DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s') as order_date,
                status,
                shipping_address,
                wilaya,
                commune,
                tracking_number,
                DATE_FORMAT(estimated_delivery_date, '%Y-%m-%d') as estimated_delivery_date,
                DATE_FORMAT(actual_delivery_date, '%Y-%m-%d') as actual_delivery_date
            FROM orders
            WHERE order_id = ?
        `, [orderId]);

        res.json(updatedOrder[0]);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    try {
        const dashboardPath = path.join(__dirname, '../../../frontend/frontend/fr6/dashboard.html');
        console.log('Attempting to serve dashboard.html from:', dashboardPath);
        res.sendFile(dashboardPath, (err) => {
            if (err) {
                console.error('Error serving dashboard.html:', err);
                res.status(500).json({ 
                    error: 'Failed to serve dashboard.html',
                    details: err.message,
                    path: dashboardPath
                });
            }
        });
    } catch (error) {
        console.error('Error in root route:', error);
        res.status(500).json({ 
            error: 'Failed to serve dashboard.html',
            details: error.message,
            stack: error.stack
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        error: 'Something broke!',
        details: err.message,
        code: err.code,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log('\n🚀 Server is running!');
    console.log('\n📱 Access the application at:');
    console.log(`   http://localhost:${PORT}`);
    console.log('\n📊 Dashboard:');
    console.log(`   http://localhost:${PORT}/dashboard.html`);
    console.log('\n✨ Happy tracking!\n');
}); 