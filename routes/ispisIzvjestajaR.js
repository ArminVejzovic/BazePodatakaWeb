const express = require('express');
const router = express.Router();

const mysql = require('mysql2/promise');

const pool = require('../mysql/config');


router.post('/ruta-za-prodaju-proizvoda', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ProdajaProizvodaZaPeriod(?, ?);', [odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', { odabraniIzvjestaj: 'prodajaProizvoda', elementiIzvjestaja: result });
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/ruta-za-prodaju-po-kupcima', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ProdajaPoKupcimaZaPeriod(?, ?);', [odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', {odabraniIzvjestaj: 'prodajaPoKupcima', elementiIzvjestaja: result});
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/ruta-za-listu-narudzbi-koje-nisu-isporucene', async (req, res) => {

    try {
        // Dobivanje veze iz bazena
        const connection = await pool.getConnection();

        try {
            // Izvršavanje stored procedure
            const result = await connection.execute('CALL ListaNarudzbiKojeNisuIsporucene');

            // Render the response
            res.render('izvjestaj', { odabraniIzvjestaj: 'neisporuceneNarudzbe', elementiIzvjestaja: result });
        } finally {
            // Oslobađanje veze
            connection.release();
        }
    } catch (error) {
        console.error('Error executing stored procedure:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Ruta za procesiranje forme za listu isporučenih narudžbi sa vremenom većim od n minuta
router.post('/ruta-za-listu-isporucenih-narudzbi-sa-vremenom', async (req, res) => {

    try {
        const nMinuta = req.body.nMinuta;
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ListaIsporucenihNarudzbiSaVremenom(?, ?, ?);', [nMinuta, odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', {odabraniIzvjestaj: 'isporuceneSaVremenom', elementiIzvjestaja: result});
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/ruta-za-prosjecno-vrijeme-isporuke-po-dostavljacima', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ProsjecnoVrijemeIsporukePoDostavljacima(?, ?);', [odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', {odabraniIzvjestaj: 'prosjecnoVrijemeIsporukeDostavljaci', elementiIzvjestaja: result});
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/ruta-za-listu-vozila-sa-ukupnim-vremenom-zaduzenja', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ListaVozilaSaUkupnimVremenomZaduzenja(?, ?);', [odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', {
                    odabraniIzvjestaj: 'listaVozilaVrijemeZaduzenja',
                    elementiIzvjestaja: result
                });
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/ruta-za-listu-vozila-koja-koriste-vise-dostavljaca', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL ListaVozilaKojaKoristeViseDostavljaca(?, ?);', [odDatuma, doDatuma]);

                // Render the response
                res.render('izvjestaj', {
                    odabraniIzvjestaj: 'vozilaSaViseDostavljaca',
                    elementiIzvjestaja: result
                });
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});



// Ruta za procesiranje forme za uporednu prodaju po proizvodima
router.post('/ruta-za-uporednu-prodaju-po-proizvodima', async (req, res) => {

    try {
        const odDatuma1 = req.body.odDatuma1;
        const doDatuma1 = req.body.doDatuma1;
        const odDatuma2 = req.body.odDatuma2;
        const doDatuma2 = req.body.doDatuma2;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure'
                const result = await connection.execute('CALL UporednaProdajaPoProizvodima(?, ?, ?, ?);', [odDatuma1, doDatuma1, odDatuma2, doDatuma2]);

                // Render the response
                res.render('izvjestaj', {
                    odabraniIzvjestaj: 'uporednaProdajaPoProizvodima',
                    elementiIzvjestaja: result
                });
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/ruta-za-narudzbe-sa-proizvodima', async (req, res) => {
    try {
        const odDatuma = req.body.odDatuma;
        const doDatuma = req.body.doDatuma;
        const proizvodi_string = req.body.proizvodiString;

        try {
            // Dobivanje veze iz bazena
            const connection = await pool.getConnection();

            try {
                // Izvršavanje stored procedure
                const result = await connection.execute('CALL NarudzbeSaProizvodima(?, ?, ?);', [odDatuma, doDatuma, proizvodi_string]);

                // Render the response
                res.render('izvjestaj', {
                    odabraniIzvjestaj: 'narudzbeSaProizvodima',
                    elementiIzvjestaja: result
                });
            } finally {
                // Oslobađanje veze
                connection.release();
            }
        } catch (error) {
            console.error('Error executing stored procedure:', error);
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;