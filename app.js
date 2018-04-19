var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

// 起一个MongoDB服务，链接本地MongoDB服务器，页面操作数据
var session = require("express-session");
var MongoStore=require('connect-mongo')(session);
var db = require('./db');

var router = require('./router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB服务
app.use(session({
    secret: "Ekko",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection:db.dbCon
    })
}));

// !!!!!! 所有的中间件都需要放在路由的上面，这样才能在路由req中获取到中间件的值  !!!!!!
app.use('/', router);

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
  res.render('error',{title: '出错了',pagename: 'error',page: [-1,-1]});
});

module.exports = app;
