const express = require('express');
const cors = require('cors');

const path = require('path');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the frontend/fr1 directory
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr1')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr1/index.html'));
});

// Get total sales for different time periods
app.get('/api/sales', async (req, res) => {
    try {
        const period = req.query.period || '6months';
        let dateFilter;
        let groupByFormat;

        switch(period) {
            case '24hours':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)';
                groupByFormat = '%Y-%m-%d %H:00:00';
                break;
            case '7days':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)';
                groupByFormat = '%Y-%m-%d';
                break;
            case 'lastmonth':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 4 WEEK)';
                groupByFormat = '%Y-%m-%d';
                break;
            case 'quarter':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 4 MONTH)';
                groupByFormat = '%Y-%m';
                break;
            case '6months':
            default:
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 6 MONTH)';
                groupByFormat = '%Y-%m';
                break;
        }

        const [rows] = await pool.query(`
            WITH time_series AS (
                SELECT 
                    CASE 
                        WHEN ? = '24hours' THEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL n HOUR), '%Y-%m-%d %H:00:00')
                        WHEN ? = '7days' THEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL n DAY), '%Y-%m-%d')
                        WHEN ? = 'lastmonth' THEN DATE_FORMAT(DATE_SUB(NOW(), INTERVAL n DAY), '%Y-%m-%d')
                        ELSE DATE_FORMAT(DATE_SUB(NOW(), INTERVAL n MONTH), '%Y-%m')
                    END as time_period
                FROM (
                    SELECT 0 as n UNION SELECT 1 UNION SELECT 2 
                    UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
                    UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
                    UNION SELECT 9 UNION SELECT 10 UNION SELECT 11
                    UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
                    UNION SELECT 15 UNION SELECT 16 UNION SELECT 17
                    UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
                    UNION SELECT 21 UNION SELECT 22 UNION SELECT 23
                    UNION SELECT 24 UNION SELECT 25 UNION SELECT 26
                    UNION SELECT 27 UNION SELECT 28 UNION SELECT 29
                    UNION SELECT 30
                ) numbers
                WHERE 
                    CASE 
                        WHEN ? = '24hours' THEN n < 24
                        WHEN ? = '7days' THEN n < 7
                        WHEN ? = 'lastmonth' THEN n < 28
                        WHEN ? = 'quarter' THEN n < 4
                        ELSE n < 6
                    END
            )
            SELECT 
                ts.time_period,
                COALESCE(SUM(o.total_price), 0) as total_sales,
                COUNT(o.order_id) as total_orders,
                COALESCE(AVG(o.total_price), 0) as average_order_value,
                SUM(CASE WHEN o.status = 'delivered' THEN 1 ELSE 0 END) as delivered_orders,
                SUM(CASE WHEN o.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_orders
            FROM time_series ts
            LEFT JOIN orders o ON 
                CASE 
                    WHEN ? = '24hours' THEN DATE_FORMAT(o.order_date, '%Y-%m-%d %H:00:00') = ts.time_period
                    WHEN ? = '7days' OR ? = 'lastmonth' THEN DATE_FORMAT(o.order_date, '%Y-%m-%d') = ts.time_period
                    ELSE DATE_FORMAT(o.order_date, '%Y-%m') = ts.time_period
                END
            WHERE o.order_date >= ${dateFilter}
            GROUP BY ts.time_period
            ORDER BY ts.time_period ASC
        `, [period, period, period, period, period, period, period, period, period, period]);

        console.log('Sales data for period', period, ':', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching sales data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get order status distribution
app.get('/api/order-status', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                COALESCE(status, 'unknown') as status,
                COUNT(*) as count
            FROM orders
            GROUP BY status
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching order status data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get top products
app.get('/api/top-products', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                p.name,
                COALESCE(SUM(o.quantity), 0) as total_quantity,
                COALESCE(SUM(o.total_price), 0) as total_revenue
            FROM products p
            LEFT JOIN orders o ON p.product_id = o.product_id
            GROUP BY p.product_id, p.name
            ORDER BY total_quantity DESC
            LIMIT 7
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching top products data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user acquisition data
app.get('/api/user-acquisition', async (req, res) => {
    try {
        const period = req.query.period || '6months';
        let dateFilter;
        let groupByFormat;
        let interval;
        let remaining;
        let startDate;

        switch(period) {
            case '24hours':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)';
                groupByFormat = '%Y-%m-%d %H:00:00';
                interval = 'HOUR';
                remaining = 23;
                startDate = 'DATE_SUB(NOW(), INTERVAL 23 HOUR)';
                break;
            case '7days':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)';
                groupByFormat = '%Y-%m-%d';
                interval = 'DAY';
                remaining = 6;
                startDate = 'DATE_SUB(NOW(), INTERVAL 6 DAY)';
                break;
            case 'lastmonth':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 4 WEEK)';
                groupByFormat = '%Y-%m-%d';
                interval = 'DAY';
                remaining = 27;
                startDate = 'DATE_SUB(NOW(), INTERVAL 27 DAY)';
                break;
            case '6months':
            default:
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 6 MONTH)';
                groupByFormat = '%Y-%m';
                interval = 'MONTH';
                remaining = 5;
                startDate = 'DATE_SUB(NOW(), INTERVAL 5 MONTH)';
                break;
        }

        const [rows] = await pool.query(`
            WITH RECURSIVE dates AS (
                SELECT 
                    DATE_FORMAT(${startDate}, ?) as date_value,
                    ? as remaining
                UNION ALL
                SELECT 
                    DATE_FORMAT(
                        CASE 
                            WHEN ? = 'MONTH' THEN DATE_ADD(STR_TO_DATE(date_value, ?), INTERVAL 1 MONTH)
                            WHEN ? = 'DAY' THEN DATE_ADD(STR_TO_DATE(date_value, ?), INTERVAL 1 DAY)
                            ELSE DATE_ADD(STR_TO_DATE(date_value, ?), INTERVAL 1 HOUR)
                        END,
                        ?
                    ),
                    remaining - 1
                FROM dates
                WHERE remaining > 0
            )
            SELECT 
                d.date_value as month,
                COALESCE(COUNT(DISTINCT u.user_id), 0) as total_users
            FROM dates d
            LEFT JOIN users u ON 
                DATE_FORMAT(u.registration_date, ?) <= d.date_value
            WHERE u.type = 'user'
            GROUP BY d.date_value
            ORDER BY d.date_value ASC
        `, [
            groupByFormat, 
            remaining,
            interval,
            groupByFormat,
            interval,
            groupByFormat,
            groupByFormat,
            groupByFormat,
            groupByFormat
        ]);

        console.log('Total users data for period', period, ':', rows);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching total users data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get revenue by category
app.get('/api/revenue-by-category', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                c.name as category,
                COALESCE(SUM(o.total_price), 0) as revenue
            FROM categories c
            LEFT JOIN products p ON c.category_id = p.category_id
            LEFT JOIN orders o ON p.product_id = o.product_id
            GROUP BY c.category_id, c.name
            ORDER BY revenue DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching revenue by category data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get top states by revenue
app.get('/api/top-states', async (req, res) => {
    try {
        const period = req.query.period || '6months';
        let dateFilter;

        switch(period) {
            case '24hours':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 24 HOUR)';
                break;
            case '7days':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)';
                break;
            case 'lastmonth':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 4 WEEK)';
                break;
            case 'quarter':
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 4 MONTH)';
                break;
            case '6months':
            default:
                dateFilter = 'DATE_SUB(NOW(), INTERVAL 6 MONTH)';
                break;
        }

        const [rows] = await pool.query(`
            SELECT 
                COALESCE(wilaya, 'Unknown') as wilaya,
                COALESCE(SUM(total_price), 0) as revenue
            FROM orders
            WHERE order_date >= ${dateFilter}
            GROUP BY wilaya
            ORDER BY revenue DESC
            LIMIT 10
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching top states data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get dashboard stats
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                COALESCE(SUM(total_price), 0) as total_sales,
                COUNT(*) as total_orders,
                (SELECT COUNT(*) FROM users WHERE type = 'user') as active_users,
                (SELECT COUNT(*) FROM products) as total_products
            FROM orders
        `);
        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 