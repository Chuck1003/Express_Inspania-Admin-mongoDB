/**
 * 静态资源自动化构建部署工具
 * 使用说明：
 *     1、开发阶段执行gulp即可，会自动监听主文件和子模块的变化后编译，但不监听主文件所在目录以外的模块变更
*      2、待续...
 * author：cxf15062@ly.com
 * 版权所有：chuck
 */
'use strict';
var path  = require('path');
var react = require('gulp-react');
var appPath = '';

// 基础类
var glob       = require('glob');
var http       = require('http');
var request    = require('request');
var fs         = require('fs');
var gulp       = require('gulp');

// 工具类
var rename     = require("gulp-rename");
var moment     = require("moment");
var colors     = require("colors/safe");
var del        = require('del');
var assign     = require('lodash.assign');
var archiver   = require('archiver');

// gulp插件
var minifycss  = require('gulp-minify-css');
var rev        = require('gulp-rev');
var base64     = require('gulp-base64');
var less       = require('gulp-less');
var notify     = require('gulp-notify');
var plumber    = require('gulp-plumber');

// browserify相关
var watchify   = require('watchify');
var browserify = require('browserify');
var uglify     = require('gulp-uglify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var through2   = require('through2');
var babelify   = require('babelify');
var es2015     = require('babel-preset-es2015-without-strict');

// 热加载相关
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 报错抛出提示
var errorHandler = function(err) {
    renderLog.info('编译错误：', 'error');
    notify.onError(err.message)(err); // for growl
};

var renderLog = {
    info: function(msg) {
        console.log(colors.cyan("[" + moment().format('hh:mm:ss') + "] " + msg));
    },
    success: function(msg) {
        console.log(colors.green("[" + moment().format('hh:mm:ss') + "] " + msg));
    },
    warning: function(msg) {
        console.log(colors.yellow("[" + moment().format('hh:mm:ss') + "] " + msg));
    },
    error: function(msg) {
        console.log(colors.red("[" + moment().format('hh:mm:ss') + "] " + msg));
    }
};

// 根据变动生成css与js，支持监听同目录下的子模块变动
function dev() {
    renderLog.info('开始监听Less和JS源文件，发生修改后会自动编译……');
    var watcher = gulp.watch(appPath + 'public/react/*.(less|js)');
    watcher.on('change', function(filepath, stats) {
        var filename = path.basename(filepath);
        var dir = path.dirname(filepath);
        var isModule = /^_/gi.test(filename) ? true : false;
        var type = /\.less$/gi.test(filename) ? 'less' : 'js';
        var handler = /\.less$/gi.test(filename) ? buildCss : buildJs;
        handler(dir + '/!(_)*.' + type, function() {
            renderLog.success('[' + (isModule ? '模块' : '主文件') + filepath + ']发生了变化，编译成功');
        });
    });
}

// 编译less
function buildCss(file, callback) {
    if (typeof file !== 'string') {
        file = appPath + 'public/react/!(_)*.less';
        renderLog.info('开始重新编译所有Less文件，请稍候……');
    }

    return gulp.src(file)
        .pipe(plumber({ errorHandler: errorHandler }))
        .pipe(less())
        .pipe(rename(function (path) {
            path.dirname = '';
            path.basename = path.basename.toLowerCase();
        }))
        .pipe(gulp.dest(appPath + 'public/css'))
        .on('finish', function() {
            if (typeof callback === 'function') callback();
        });
}

// 编译js
function buildJs(file, callback) {
    if (typeof file !== 'string') {
        file = appPath + 'src/**/!(_)*.js';
        // console.log(file);
        renderLog.info('开始重新编译所有JS文件，请稍候……');
    }
    return gulp.src(file)
        .pipe(react())
        .pipe(gulp.dest('public/js'))
        .on('finish', function() {
            if (typeof callback === 'function') callback();
        });
}

// 注册任务
gulp.task(dev); // 开发阶段监听变化`
gulp.task(buildCss); // 重新编译所有less
gulp.task(buildJs); // 重新编译所有JS

// 默认任务，先编译所有JS和CSS，然后开始监听
gulp.task('default', gulp.series('buildCss', 'buildJs', 'dev'));