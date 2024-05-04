const express = require('express');
const router = express.Router();

router.get('/izaberi-izvjestaj', function(req, res, next) {
    res.render('odaberiIzvjestajZaGenerisanje');
});

module.exports = router;
