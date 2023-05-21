var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const randomTipRouter = require('./routes/randomTipRouter');
const loginRouter = require('./routes/loginRouter');
const registerRouter = require('./routes/registerRouter');
const profileRouter = require('./routes/profileRouter');
const blogRouter = require('./routes/blogRouter');
const emailRouter = require('./routes/emailRouter');
//const exercisesRouter = require('./routes/exercisesRouter');
//const exerciseSetsRouter = require('./routes/exerciseSetsRouter');

var app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Zastąp tym adresem URL twojego front-endu
  credentials: true, // Włącz przesyłanie cookies i uwierzytelnianie
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  key: "userid",
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 5000
  }
}));

app.use('/random-tip', randomTipRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/blog', blogRouter);
app.use('/email', emailRouter);
//app.use('/exercises', exercisesRouter);
//app.use('/exercise-sets', exerciseSetsRouter);
app.get('/session', (req, res) => {
  if (session[req.cookies.random_login_key]) {
    return res.json({ loggedIn: true });
  } else {
    return res.json({ loggedIn: false });
  }
});
app.get('/api/isAdmin', (req, res) => {
    const isAdmin = session.isAdmin;
    res.json({ isAdmin });
    console.log("Odczytano", isAdmin);
});

app.get('/logout', (req, res) => {
  delete session[req.cookies.random_login_key];
  res.clearCookie('random_login_key');
  res.json(true);
});

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

module.exports = app;
