const express = require('express');
const path = require('path');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../../frontend/frontend/fr2')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// API endpoint to get all site images (banners and products)
app.get('/api/images', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM site_images WHERE id = 1');
        if (results.length === 0) {
            // If no row exists, return empty object
            res.json({});
        } else {
            res.json(results[0]);
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ 
            error: 'Failed to fetch images', 
            details: error.message,
            code: error.code
        });
    }
});

// API endpoint to update site images
app.post('/api/images', async (req, res) => {
    const { 
        banner1, banner2, banner3,
        recommendations_prd1, recommendations_prd2,
        flash_sales_prd1, flash_sales_prd2,
        big_saves_prd1, big_saves_prd2 
    } = req.body;
    
    try {
        // Validate banner URLs
        if (banner1 && !banner1.startsWith('http://') && !banner1.startsWith('https://')) {
            return res.status(400).json({ error: 'Invalid banner1 URL format' });
        }
        if (banner2 && !banner2.startsWith('http://') && !banner2.startsWith('https://')) {
            return res.status(400).json({ error: 'Invalid banner2 URL format' });
        }
        if (banner3 && !banner3.startsWith('http://') && !banner3.startsWith('https://')) {
            return res.status(400).json({ error: 'Invalid banner3 URL format' });
        }

        // First check if row with id=1 exists
        const [existing] = await db.query('SELECT id FROM site_images WHERE id = 1');
        
        if (existing.length === 0) {
            // If no row exists, create it
            await db.query(`
                INSERT INTO site_images (
                    id, banner1, banner2, banner3,
                    prd1, prd2, prd3, prd4, prd5, prd6
                ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                banner1 || null, banner2 || null, banner3 || null,
                recommendations_prd1 || null, recommendations_prd2 || null,
                flash_sales_prd1 || null, flash_sales_prd2 || null,
                big_saves_prd1 || null, big_saves_prd2 || null
            ]);
        } else {
            // Update existing row
            await db.query(`
                UPDATE site_images 
                SET banner1 = ?,
                    banner2 = ?,
                    banner3 = ?,
                    prd1 = ?,
                    prd2 = ?,
                    prd3 = ?,
                    prd4 = ?,
                    prd5 = ?,
                    prd6 = ?
                WHERE id = 1
            `, [
                banner1 || null, banner2 || null, banner3 || null,
                recommendations_prd1 || null, recommendations_prd2 || null,
                flash_sales_prd1 || null, flash_sales_prd2 || null,
                big_saves_prd1 || null, big_saves_prd2 || null
            ]);
        }
        
        res.json({ 
            success: true,
            message: 'Images updated successfully',
            data: {
                banner1, banner2, banner3,
                recommendations_prd1, recommendations_prd2,
                flash_sales_prd1, flash_sales_prd2,
                big_saves_prd1, big_saves_prd2
            }
        });
    } catch (error) {
        console.error('Error updating images:', error);
        res.status(500).json({ 
            error: 'Failed to update images',
            details: error.message 
        });
    }
});

// API endpoint to get categories
app.get('/api/categories', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM categories ORDER BY category_id');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// API endpoint to add a new category
app.post('/api/categories', async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Category name is required and must be a non-empty string' });
        }

        const trimmedName = name.trim();
        
        // Check if category already exists
        const [existing] = await db.query('SELECT * FROM categories WHERE name = ?', [trimmedName]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        // Insert new category
        const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [trimmedName]);
        
        // Fetch the newly created category
        const [newCategory] = await db.query('SELECT * FROM categories WHERE category_id = ?', [result.insertId]);
        
        res.status(201).json(newCategory[0]);
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Failed to add category' });
    }
});

// API endpoint to check categories table contents
app.get('/api/categories/check', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM categories');
        console.log('Current categories in database:', results);
        res.json({
            count: results.length,
            categories: results
        });
    } catch (error) {
        console.error('Error checking categories:', error);
        res.status(500).send('Error checking categories');
    }
});

// Update product image
app.post('/api/products/:productId/image', async (req, res) => {
    const { productId } = req.params;
    const { image_url } = req.body;

    if (!image_url) {
        return res.status(400).json({ error: 'Image URL is required' });
    }

    try {
        // Validate the image URL
        if (!image_url.startsWith('http://') && !image_url.startsWith('https://')) {
            return res.status(400).json({ error: 'Invalid image URL format' });
        }

        // First check if row with id=1 exists
        const [existing] = await db.query('SELECT id FROM site_images WHERE id = 1');
        
        if (existing.length === 0) {
            // If no row exists, create it
            await db.query(
                `INSERT INTO site_images (id, ${productId}) 
                 VALUES (1, ?)`,
                [image_url]
            );
        } else {
            // Update existing row
            await db.query(
                `UPDATE site_images 
                 SET ${productId} = ? 
                 WHERE id = 1`,
                [image_url]
            );
        }

        res.json({ success: true, message: 'Product image updated successfully' });
    } catch (error) {
        console.error('Error updating product image:', error);
        res.status(500).json({ error: 'Failed to update product image' });
    }
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    try {
        const indexPath = path.join(__dirname, '../../../frontend/frontend/fr2/index.html');
        console.log('Attempting to serve index.html from:', indexPath);
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error('Error serving index.html:', err);
                res.status(500).json({ 
                    error: 'Failed to serve index.html',
                    details: err.message,
                    path: indexPath
                });
            }
        });
    } catch (error) {
        console.error('Error in root route:', error);
        res.status(500).json({ 
            error: 'Failed to serve index.html',
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

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        app.listen(port + 1);
    } else {
        console.error('Server error:', err);
    }
}); 