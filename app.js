var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 起一个MongoDB服务，链接本地MongoDB服务器，页面操作数据

var rediz = require('redis');
// var redis =rediz.createClient({ "host": "127.0.0.1", "port": "6379" });//起一个服务，接bluebird，异步数据存储、读取...
// redis.on('error', function (err) { console.log('errorevent - ' + redis.host + ':' + redis.port + ' - ' + err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var router = require('./router');
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
