var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index',{title: '图书管理',pagename: 'index',page: [0,0]});
});
router.get('/users', function(req, res, next) {
    res.render('./index/users',{title: '欢迎登陆',pagename: 'users',page: [0,1]});
});
router.get('/infos', function(req, res, next) {
    res.render('./index/infos',{title: '最新通知',pagename: 'infos',page: [0,2]});
});

router.get('/location', function(req, res, next) {
    res.render('./search/location',{title: '楼层定位',pagename: 'location',page: [1,0]});
});
router.get('/type', function(req, res, next) {
    res.render('./search/type',{title: '类别搜索',pagename: 'type',page: [1,1]});
});

router.get('/all', function(req, res, next) {
    res.render('./floor/all',{title: '所有楼层',pagename: 'all',page: [2,0]});
});
router.get('/current', function(req, res, next) {
    res.render('./floor/current',{title: '单层导航',pagename: 'current',page: [2,1]});
});

router.get('/borrow', function(req, res, next) {
    res.render('./atm/borrow',{title: '自助借书',pagename: 'borrow',page: [3,0]});
});
router.get('/return', function(req, res, next) {
    res.render('./atm/return',{title: '自助还书',pagename: 'return',page: [3,1]});
});

module.exports = router;
