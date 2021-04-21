/* Dependencies */
const createError = require('http-errors');
const express = require('express'); // set express module to constant variable
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
// trigger database connection and mongoose schema models to be loaded at application startup
require('./app_api/models/db');
// reference routers
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const nurseryRouter = require('./app_server/routes/nursery');
const apiRouter = require('./app_api/routes/index');


/* Invoke Express Module */
const app = express();


/* View Engine */
app.set('views', path.join(__dirname, 'app_server', 'views'));  // setup view engine (set views to 'views' directory)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials')); // register handlebars partials (https://www.npmjs.com/package/hbs)
app.set('view engine', 'hbs');  // set view engine to handlebars


/* use() functions */
app.use(logger('dev')); // development output formatting for logs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// use routers
app.use('/', indexRouter); // send request for '/' to the index router
app.use('/users', usersRouter); // send request for '/users' to the users router
app.use('/nursery', nurseryRouter); // send request for '/nursery' to the nursery router
app.use('/api', apiRouter); // send request for '/api' to the api router

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


/* Export Application (Express Module) */
module.exports = app;
