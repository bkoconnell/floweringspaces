// imports & variable definitions
const createError = require('http-errors');
const express = require('express'); // set express module to variable
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');

// reference routers
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const nurseryRouter = require('./app_server/routes/nursery');

// invoke express module
const app = express();

/* view engine */
// set the view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));
// set view engine to handlebars
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); // send request for '/' to the index router
app.use('/users', usersRouter); // send request for '/users' to the users router
app.use('/nursery', nurseryRouter); // send request for '/nursery' to the nursery router


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

// export application
module.exports = app;
