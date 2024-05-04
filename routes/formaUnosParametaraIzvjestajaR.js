const express = require('express');
const router = express.Router();

router.post('/izvjestaj-forma', (req, res) => {
    const selectedOption = req.body.tipIzvjestaja;

    // Na osnovu izabrane opcije, renderujte odgovarajući EJS fajl sa formom za unos parametara
    res.render(`formeUnosParametaraIzvjestaja`, {odabraniIzvjestaj: selectedOption});
});

module.exports = router;
