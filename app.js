//core and third-party modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

//file-based modules
var index = require('./routes/index');
var users = require('./routes/users');
var config = require("./config.js");
var courseRouter = require('./routes/courseRouter');
var favoriteRouter = require('./routes/favoriteRouter');

//create an express app
var app = express();

//connect to mongodb server
var mongoose = require('mongoose');
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
//using asynchronous console!
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, 'Connected correctly to the mongoDB server!'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, './angular-app'))); //Debug angular app!!!!
app.use(express.static(path.join(__dirname, './angular-app/dist'))); //angular app!!!!
app.use(session({
    secret: '8348^#*!))shdjs',
    resave: true,
    saveUninitialized: true
}));

//passport config for authentication
app.use(passport.initialize());
//using persistent login sessions
app.use(passport.session());
var authenticate = require('./authenticate.js');

//routing
app.use('/', index);
app.use('/users', users);
app.use('/courses', courseRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({     //Since the client is angular application, easier to handler JSON string
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
