const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr4')));

// عرض الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../frontend/frontend/fr4/dashboard.html'));
});

// API: عرض المنتجات
app.get('/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        res.status(500).send('Error fetching products');
    }
});

// API: عرض منتج واحد
app.get('/products/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (err) {
        res.status(500).send('Error fetching product');
    }
});

// API: عرض تفاصيل المنتج
app.get('/products/:id/details', async (req, res) => {
    try {
        // تحديث عدد الزيارات
        await db.query('UPDATE products SET visits = visits + 1 WHERE product_id = ?', [req.params.id]);
        
        // جلب تفاصيل المنتج
        const [rows] = await db.query('SELECT * FROM products WHERE product_id = ?', [req.params.id]);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ message: 'Error fetching product details' });
    }
});

// API: إضافة منتج
app.post('/products', async (req, res) => {
    const { name, description, price, quantity, image_url, category_id, old_price, discount_percent } = req.body;
    try {
        await db.query(`
            INSERT INTO products (name, description, price, quantity, image_url, category_id, old_price, discount_percent)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, description, price, quantity, image_url, category_id, old_price, discount_percent]
        );
        res.status(200).json({ success: true, message: 'Product added successfully' });
    } catch (err) {
        console.error('Error inserting product:', err);
        res.status(500).json({ success: false, message: 'Error inserting product' });
    }
});

// API: تعديل منتج
app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const { name, description, price, quantity, image_url, category_id, old_price, discount_percent } = req.body;
    try {
        await db.query(`
            UPDATE products SET name=?, description=?, price=?, quantity=?, image_url=?, category_id=?, old_price=?, discount_percent=?
            WHERE product_id=?`,
            [name, description, price, quantity, image_url, category_id, old_price, discount_percent, id]
        );
        res.status(200).json({ success: true, message: 'Product updated successfully' });
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ success: false, message: 'Error updating product' });
    }
});

// API: حذف منتج
app.delete('/products/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM products WHERE product_id = ?', [req.params.id]);
        res.status(200).send('Product deleted successfully');
    } catch (err) {
        res.status(500).send('Error deleting product');
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
