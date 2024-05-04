const express = require('express');
const router = express.Router();
const pool = require('../mysql/config');

router.get('/status-narudzbi', async (req, res) => {
    try {
        const [narudzbe] = await pool.query('SELECT narudzba_id, datum_vrijeme_narudzbe FROM narudzbe');

        const statusiNarudzbi = await Promise.all(narudzbe.map(async (narudzba) => {
            const [isporukaData] = await pool.query('SELECT datum_vrijeme_zavrsetka, status_isporuke FROM isporuke WHERE narudzba_id = ?', [narudzba.narudzba_id]);

            const currentDate = new Date();
            const narudzbaDate = new Date(narudzba.datum_vrijeme_narudzbe);
            const isporukaDate = isporukaData[0].datum_vrijeme_zavrsetka ? new Date(isporukaData[0].datum_vrijeme_zavrsetka) : null;
            const statusIsporuke = isporukaData[0].status_isporuke;

            let statusNarudzbe;

            if (statusIsporuke) {
                statusNarudzbe = 'Isporučena';
            } else if (isporukaDate) {
                if (isporukaDate < currentDate) {
                    statusNarudzbe = 'Naručena i isporuka u toku';
                } else {
                    statusNarudzbe = 'Naručena i čeka na isporuku, planirana isporuka';
                }
            } else {
                if (narudzbaDate < currentDate) {
                    statusNarudzbe = 'Naručena i čeka na isporuku';
                } else {
                    statusNarudzbe = 'Naručena i čeka na isporuku, planirana isporuka';
                }
            }

            return { narudzbaId: narudzba.narudzba_id, statusNarudzbe };
        }));

        // Renderovanje EJS template-a
        res.render('statusIsporukeNarudzbe', { statusNarudzbe : statusiNarudzbi, narudzbaId : narudzbe.narudzba_id });
    } catch (error) {
        console.error('Error fetching order statuses:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
