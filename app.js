var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');

var indexRouter = require('./routes/index');
const odaberiIzvjestajZaGenerisanjeRouter = require('./routes/odaberiIzvjestajZaGenerisanjeR');
const formaUnosParametaraIzvjestajaRouter = require('./routes/formaUnosParametaraIzvjestajaR');
const ispisIzvjestajaRouter = require('./routes/ispisIzvjestajaR');
const slikaProizvodaRouter = require('./routes/slikeProizvodaR');
const statusIsporukeNarudzbeRouter = require('./routes/statusIsporukeNarudzbeR');
const zaduzenjaVozilaRouter = require('./routes/zaduzenjaVozilaR');

var app = express();
const bodyParser = require('body-parser');
const pool = require('./mysql/config.js');

const PORT = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(methodOverride('_method'));


// Omogućavanje CORS-a (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Korištenje bodyParser za parsiranje JSON-a
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use(odaberiIzvjestajZaGenerisanjeRouter);
app.use(formaUnosParametaraIzvjestajaRouter);
app.use(ispisIzvjestajaRouter);
app.use(slikaProizvodaRouter);
app.use(statusIsporukeNarudzbeRouter);
app.use(zaduzenjaVozilaRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

module.exports = app;
