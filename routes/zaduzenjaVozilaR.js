const express = require('express');
const router = express.Router();
const pool = require('../mysql/config');

// Prikaz svih zaduženja
router.get('/zaduzenja', async (req, res) => {
    try {
        const [zaduzenja] = await pool.query('SELECT * FROM zaduzenja_vozila');
        res.render('zaduzenjaVozilaPrikazi', { zaduzenja });
    } catch (error) {
        console.error('Error fetching vehicle assignments:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Forma za zaduživanje vozila
router.get('/zaduzenja-vozila-forma', (req, res) => {
    res.render('zaduzenjaVozilaForma');
});

// Zaduživanje vozila
router.post('/zaduzenja-vozila', async (req, res) => {
    const { dostavljac_id, vozilo_id } = req.body;

    try {
        await pool.query('CALL ZaduziVozilo(?, ?)', [dostavljac_id, vozilo_id]);

        const message = 'Vozilo uspješno zaduženo.';
        res.render('zaduzenjaVozilaPostavi', { message });
    } catch (error) {
        console.error('Error assigning vehicle:', error);
        res.status(500).send('Vozilo ili Dostavljac su vec zaduzeni!!!');
    }
});

// Brisanje zaduženja vozila
router.post('/zaduzenja-vozila/:id', async (req, res) => {
    const zaduzenjeId = req.params.id;

    try {
        await pool.query('UPDATE zaduzenja_vozila SET datum_vrijeme_razduzenja = now() WHERE zaduzenje_vozila_id = ?', [zaduzenjeId]);

        const message = 'Vozilo uspješno razduženo.';
        res.json({ message });
    } catch (error) {
        console.error('Error deleting vehicle assignment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
