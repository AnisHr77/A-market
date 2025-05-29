const express = require('express');
const router = express.Router();
const pool = require('./db'); // Make sure this is your MySQL pool connection

// GET all site images
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM site_images');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch site images' });
    }
});

// GET single site image by ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM site_images WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Site image not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch site image' });
    }
});

// POST new site image entry
router.post('/', async (req, res) => {
    const {
        banner1, banner2, banner3,
        prd1, prd2, prd3, prd4, prd5, prd6
    } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO site_images 
       (banner1, banner2, banner3, prd1, prd2, prd3, prd4, prd5, prd6) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [banner1, banner2, banner3, prd1, prd2, prd3, prd4, prd5, prd6]
        );
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add site image' });
    }
});

// PUT update site image by ID
router.put('/:id', async (req, res) => {
    const {
        banner1, banner2, banner3,
        prd1, prd2, prd3, prd4, prd5, prd6
    } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE site_images SET 
       banner1 = ?, banner2 = ?, banner3 = ?, 
       prd1 = ?, prd2 = ?, prd3 = ?, prd4 = ?, prd5 = ?, prd6 = ? 
       WHERE id = ?`,
            [banner1, banner2, banner3, prd1, prd2, prd3, prd4, prd5, prd6, req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Site image not found' });
        }
        res.json({ message: 'Site image updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update site image' });
    }
});

// DELETE site image by ID
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM site_images WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Site image not found' });
        }
        res.json({ message: 'Site image deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete site image' });
    }
});

module.exports = router;
