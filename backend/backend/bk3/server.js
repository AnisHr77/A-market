const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from fr3 directory
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr3')));

// Serve dashboard.html for the root route
app.get('/', (req, res) => {
    try {
        const dashboardPath = path.join(__dirname, '../../../frontend/frontend/fr3/dashboard.html');
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

// Create MySQL connection pool
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Anis2005',
    database: 'user_dashboard',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Promisify pool
const promisePool = pool.promise();

// Create employees table if not exists
async function initializeDatabase() {
    try {
        await promisePool.query(`
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
                last_work_date DATE DEFAULT NULL
                )
        `);
        console.log('✅ Database initialized successfully');
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
}

initializeDatabase();

// Helper function to check and reset work time
async function checkAndResetWorkTime(employeeId) {
    const today = new Date().toISOString().split('T')[0];

    const [rows] = await promisePool.query(
        'SELECT last_work_date, work_start_time, status FROM employees WHERE employee_id = ?',
        [employeeId]
    );

    if (rows.length === 0) return false;

    const { last_work_date: lastWorkDate, work_start_time: workStartTime, status } = rows[0];

    // Reset if new day and employee is working
    if (lastWorkDate !== today && status === 'Working') {
        await promisePool.query(
            'UPDATE employees SET work_start_time = NOW(), total_work_time = 0, last_work_date = ? WHERE employee_id = ?',
            [today, employeeId]
        );
        return true;
    }

    // If same day, working but no start time, set start time now
    if (status === 'Working' && !workStartTime) {
        await promisePool.query(
            'UPDATE employees SET work_start_time = NOW() WHERE employee_id = ?',
            [employeeId]
        );
        return true;
    }

    return false;
}

// Input validation middleware
const validateEmployeeInput = (req, res, next) => {
    const { fullName, email, phone, joinDate, role, status } = req.body;

    if (!fullName || !email || !phone || !joinDate || !role) {
        return res.status(400).json({ error: 'All fields except status are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Join date validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(joinDate)) {
        return res.status(400).json({ error: 'joinDate must be in YYYY-MM-DD format' });
    }

    // Validate status if provided
    const allowedStatuses = ['Working', 'On Leave', 'Terminated'];
    if (status && !allowedStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Allowed: ${allowedStatuses.join(', ')}` });
    }

    next();
};

// API Endpoints

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM employees ORDER BY employee_id DESC');

        for (const employee of rows) {
            if (employee.status === 'Working') {
                await checkAndResetWorkTime(employee.employee_id);
            }
        }

        const [updatedRows] = await promisePool.query('SELECT * FROM employees ORDER BY employee_id DESC');

        const now = new Date();

        const employeesWithCurrentTime = updatedRows.map(employee => {
            if (employee.status === 'Working' && employee.work_start_time) {
                const startTime = new Date(employee.work_start_time);
                const elapsed = Math.floor((now - startTime) / 1000);
                return {
                    ...employee,
                    current_work_time: employee.total_work_time + elapsed,
                    work_start_time: employee.work_start_time
                };
            } else {
                return {
                    ...employee,
                    current_work_time: employee.total_work_time,
                    work_start_time: employee.work_start_time
                };
            }
        });

        res.json(employeesWithCurrentTime);
    } catch (err) {
        console.error('Error fetching employees:', err);
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

// Get single employee by ID
app.get('/api/employees/:id', async (req, res) => {
    try {
        const [rows] = await promisePool.query(
            'SELECT * FROM employees WHERE employee_id = ?',
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        if (rows[0].status === 'Working') {
            await checkAndResetWorkTime(rows[0].employee_id);

            const [updatedRow] = await promisePool.query(
                'SELECT * FROM employees WHERE employee_id = ?',
                [req.params.id]
            );
            return res.json(updatedRow[0]);
        }

        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching employee:', err);
        res.status(500).json({ error: 'Error fetching employee' });
    }
});

// Add new employee
app.post('/api/employees', validateEmployeeInput, async (req, res) => {
    const { fullName, email, phone, joinDate, role, status } = req.body;
    const today = new Date().toISOString().split('T')[0];

    try {
        const [result] = await promisePool.query(
            'INSERT INTO employees (full_name, email, phone_number, join_date, role, status, last_work_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [fullName, email, phone, joinDate, role, status || 'Working', today]
        );

        const [newEmployee] = await promisePool.query(
            'SELECT * FROM employees WHERE employee_id = ?',
            [result.insertId]
        );

        res.status(201).json(newEmployee[0]);
    } catch (err) {
        console.error('Error adding employee:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Error adding employee' });
        }
    }
});

// Update employee
app.put('/api/employees/:id', validateEmployeeInput, async (req, res) => {
    const { fullName, email, phone, joinDate, role, status } = req.body;
    const id = req.params.id;
    const today = new Date().toISOString().split('T')[0];

    try {
        const [existing] = await promisePool.query(
            'SELECT * FROM employees WHERE employee_id = ?',
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        let workStartTime = existing[0].work_start_time;
        let totalWorkTime = existing[0].total_work_time;

        if (existing[0].status !== 'Working' && status === 'Working') {
            // Employee starts working again
            workStartTime = new Date();
            if (existing[0].last_work_date !== today) {
                totalWorkTime = 0;
            }
        } else if (existing[0].status === 'Working' && status !== 'Working') {
            // Employee stops working
            if (workStartTime) {
                const endTime = new Date();
                const workDuration = Math.floor((endTime - new Date(workStartTime)) / 1000);
                totalWorkTime += workDuration;
                workStartTime = null;
            }
        }

        await promisePool.query(
            `UPDATE employees 
             SET full_name = ?, email = ?, phone_number = ?, join_date = ?, 
                 role = ?, status = ?, work_start_time = ?, total_work_time = ?, last_work_date = ?
             WHERE employee_id = ?`,
            [fullName, email, phone, joinDate, role, status, workStartTime, totalWorkTime, today, id]
        );

        const [updatedEmployee] = await promisePool.query(
            'SELECT * FROM employees WHERE employee_id = ?',
            [id]
        );

        res.json(updatedEmployee[0]);
    } catch (err) {
        console.error('Error updating employee:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Error updating employee' });
        }
    }
});

// Delete employee
app.delete('/api/employees/:id', async (req, res) => {
    try {
        const [result] = await promisePool.query(
            'DELETE FROM employees WHERE employee_id = ?',
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

// Global error handler
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
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
