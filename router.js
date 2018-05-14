var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Book = require('./models/book');
var User = require('./models/users');

router.get('/', function(req, res, next) {
    isLogin(req, res, next) && res.render('index',{title: '图书管理',pagename: 'index',page: [0,0],user: req.session.user});
});
router.get('/users', function(req, res, next) {
    isLogin(req, res, next) && res.render('./index/users',{title: 'React Demo',pagename: 'users',page: [0,1],user: req.session.user});
});
router.get('/infos', function(req, res, next) {
    isLogin(req, res, next) && res.render('./index/infos',{title: '最新通知',pagename: 'infos',page: [0,2],user: req.session.user});
});

router.get('/location', function(req, res, next) {
    isLogin(req, res, next) && res.render('./search/location',{title: '楼层定位',pagename: 'location',page: [1,0],user: req.session.user});
});
router.get('/type', function(req, res, next) {
    isLogin(req, res, next) && res.render('./search/type',{title: '类别搜索',pagename: 'type',page: [1,1],user: req.session.user});
});

router.get('/all', function(req, res, next) {
    isLogin(req, res, next) && res.render('./floor/all',{title: '所有楼层',pagename: 'all',page: [2,0],user: req.session.user});
});
router.get('/current', function(req, res, next) {
    isLogin(req, res, next) && res.render('./floor/current',{title: '单层导航',pagename: 'current',page: [2,1],user: req.session.user});
});

router.get('/borrow', function(req, res, next) {
    isLogin(req, res, next) && res.render('./atm/borrow',{title: '自助借书',pagename: 'borrow',page: [3,0],user: req.session.user});
});
router.get('/return', function(req, res, next) {
    isLogin(req, res, next) && res.render('./atm/return',{title: '自助还书',pagename: 'return',page: [3,1],user: req.session.user});
});

router.get('/login',function(req, res, next){
    res.render('./login',{title: '用户登录',pagename: 'login',page: [-1,-1],user: req.session.user});
});
router.get('/reg',function(req, res, next){
    res.render('./reg',{title: '用户注册',pagename: 'reg',page: [-1,-1],user: req.session.user});
});
router.get('/logout',function(req, res, next){
    req.session.user = {name: '-1'};
    res.redirect('/login');
});

//获取图书列表
router.get('/getBookList',function(req, res){
    Book.find({id: {$gt: 0}},function(err,posts){
        var data = {
            isSuccess: true,
            bookList: []
        }
        if(err){
            req.session.message = err.message;
            data.isSuccess = false;
            data.bookList = [];
        }
        data.total = posts.length;
        data.pageSize = parseInt(req.query.pageSize);
        data.pageIndex = parseInt(req.query.pageIndex);

        //获取图书最大ID
        var max = posts[posts.length-1].id;
        Book.collection.update({id: -1},{$set: {
            maxid: max
        }})

        data.bookList = posts.splice((req.query.pageIndex - 1) * 10, req.query.pageSize);
        return res.json(data);
    }).sort({id: 1});
});

// 新增图书
router.post('/addBook',function(req, res, next){
    // 新的ID
    Book.find({id: -1},function(err,doc){
        var newBook = new Book({
            id: doc[0]._doc.maxid + 1,
            name: req.body.name,
            type: req.body.type,
            place: req.body.place,
            editable: 0,
        });
        Book.collection.save(newBook,function(err){
            var data = {
                isSuccess: true,
                msg: '新增成功'
            }
            if(err){
                data.isSuccess = false;
                data.msg = err.message;
            }
            return res.json(data);
        });
    })
});

//编辑图书
router.post('/saveEdit',function(req, res){
    var _selId = req.body.id;
    Book.update({id: _selId},{$set:{
        name: req.body.name,
        type: req.body.type,
        place: req.body.place
    }},function(err,suc){
        if(err){

        }
        res.json({
            isSuccess: true,
            msg: '更新成功'
        })
    });
});

//删除图书
router.post('/deleteBook',function(req, res){
    var _selId = req.body.id;
    Book.remove({id: _selId},function(err,posts){
        var data = {
            isSuccess: true,
            msg: '删除成功'
        }
        if(err){
            data.isSuccess = false;
            data.msg = err.message;
        }
        return res.json(data);
    });
});

//用户注册
router.post('/reg',function(req, res){
    var data = {
        isSuccess: false,
        msg: '注册成功'
    };
    if(req.body['password'] != req.body['passwordconf']){
        data.msg = "两次密码不一致";
        return res.json(data);
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        id: 1,
        name: req.body['name'],
        password: password
    });
    User.findOne({name:newUser.name},function(err,user){
        if(user){
            data.msg = "用户名已经存在";
            return res.json(data);
        }
        if(err){
            data.msg = err.message;
            return res.json(data);
        }
        newUser.save(function(err){
            if(err){
                data.msg = err.message;
                return res.json(data);
            }
            req.session.user = newUser;
            data.isSuccess = true;
            return res.json(data);
        });
    });
});

// 用户登录
router.post('/login',function(req, res){
    var data = {
        isSuccess: false,
        msg: '登录成功'
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.findOne({name:req.body.name},function(err,user){
        if(!user){
            data.msg = '用户不存在';
            return res.json(data);
        }
        if(user.password != password){
            data.msg = '用户密码错误';
            return res.json(data);
        }
        req.session.user = user;
        data.isSuccess = true;
        return res.json(data);
    });
});

// 登录判断
function isLogin(req, res, next){
    if(!(req.session.user && req.session.user.name != -1)){
        res.redirect('./login');
        return false;
    }
    return true;
}

module.exports = router;
