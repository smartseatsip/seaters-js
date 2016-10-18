var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var debug = require('gulp-debug');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var typescript = require('gulp-typescript');

var through = require('through2');
var http = require('http');
var connect  = require('connect');
var serveStatic = require('serve-static');

var app = connect()
  .use(serveStatic('./e2e/fixtures'))
  .use(serveStatic('./dist'));
var server = undefined;

gulp.task('clean', function() {
  return gulp.src(['dist', 'lib', 'errorShots'], {read:false})
    .pipe(clean());
});

gulp.task('build:dist', ['clean'], function() {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:lib', ['clean'], function() {
  return gulp.src('src/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('lib'));
});

gulp.task('build', ['build:dist', 'build:lib'], function() {
});

gulp.task('http', function(done) {
   server = http.createServer(app).listen(3000, done);
});

gulp.task('test:e2e', ['build', 'http'], function() {
  return gulp.src('wdio.conf.js')
    .pipe(webdriver())
    .on('end', function() {
      server.close();
    });
});
