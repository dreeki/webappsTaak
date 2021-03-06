var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let passport = require('passport');

var mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {useMongoClient:true});

require('./projectbackend/models/User');
require('./projectbackend/models/Thread');
require('./projectbackend/models/SubThread');
require('./projectbackend/config/passport');

var index = require('./projectbackend/routes/index');
var users = require('./projectbackend/routes/users');

var app = express();

// Start front-end
app.use(express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 4200);

// view engine setup
//app.set('views', path.join(__dirname / '/projectbackend', 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/API/', index);
app.use('/API/users', users);

//elke call naar index brengen
app.all("*", (req, res) => {
    res.status(200).sendFile(`${path.join(__dirname, 'dist')}/index.html`);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
