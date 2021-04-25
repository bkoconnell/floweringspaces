/* Dependencies */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express'); // set express module to constant variable
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
// const { check } = require('express-validator');

// trigger database connection and mongoose schema models to be loaded at application startup
require('./app_api/models/db');

// instantiate routers
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index');


/* Create Express Application */
const app = express();


/* View Engine */
app.set('views', path.join(__dirname, 'app_server', 'views'));  // setup view engine (set views to 'views' directory)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials')); // register handlebars partials (https://www.npmjs.com/package/hbs)
// Thanks to bendog @ http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
// for inspiring this handlebars helper solution:
hbs.registerHelper('ifequal', function (lvalue, rvalue, options) {
  if (rvalue === undefined) {
    console.log('undefined:');
    console.log(lvalue);
    console.log(rvalue);
    return;
  } 
  else if (lvalue != rvalue) {
    console.log('NOT EQUAL:');
    console.log(lvalue);
    console.log(rvalue);
    return options.inverse(this);
  } 
  else {
    console.log('Equal!:');
    console.log(lvalue);
    console.log(rvalue);
    return options.fn(this);
  }
});
// set view engine to handlebars
app.set('view engine', 'hbs');


/* use() functions */
app.use(logger('dev')); // development output formatting for logs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// allows CORS (cross-origin resource sharing)
app.use('/api', (req, res, next) => {                                 // use API endpoint
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // allow access from Angular
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // specify which headers are allowed 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // specify which methods are allowed to be called
  next();
});

// use routers
app.use('/', indexRouter); // send request for '/' to the index router
app.use('/nursery', indexRouter); // send request for '/nursery' to the index router
app.use('/landscapes', indexRouter); // send request for '/landscapes' to the index router
app.use('/users', usersRouter); // send request for '/users' to the users router
app.use('/api', apiRouter); // send request for '/api' to the api router

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/* Export Application (Express Module) */
module.exports = app;
