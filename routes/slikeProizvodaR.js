const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');

const pool = require('../mysql/config');


router.get('/slike-proizvoda', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT proizvod_id, naziv_proizvoda, slika_proizvoda FROM proizvodi');
        res.render('slike_proizvoda', { products: rows });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;