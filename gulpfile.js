var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var debug = require('gulp-debug');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var typescript = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var replace = require('gulp-replace');

var through = require('through2');
var http = require('http');
var proxy = require('http-proxy-middleware');
var connect  = require('connect');
var serveStatic = require('serve-static');

var app = connect()
  .use(serveStatic('./e2e-browser/fixtures'))
  .use(serveStatic('./dist'))
  .use('/components', serveStatic('./components'))
  .use('/examples', serveStatic('./examples'))
  .use('/api', proxy({
    target: 'https://api.dev-seaters.com',
    changeOrigin: true,
    xfwd: false,
    port: 443,
    https: true
  }));//TODO - remove as soon as cors is properly working

var server = undefined;

gulp.task('clean', function() {
  return gulp.src(['dist', 'errorShots', 'lib'], {read:false})
    .pipe(clean());
});

gulp.task('build:bundle', ['clean'], function() {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack.config.js')))
    .pipe(gulp.dest('.'));
});

function replaceVersion(src) {
  var packageVersion = require('./package.json').version;
  return gulp.src(src||[
    'src/index.ts',
    'typings/index.d.ts'
  ])
    .pipe(replace('${package.version}', packageVersion));
}

gulp.task('build:lib', ['clean'], function() {
  return replaceVersion([
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    'typings/index.d.ts'
  ])
    .pipe(typescript({
      target: 'es5',
      moduleResolution: 'node',
      declaration: true
    }))
    .pipe(gulp.dest('./lib'));
});

gulp.task('http', function(done) {
   server = http.createServer(app).listen(3000, done);
});

gulp.task('test:e2e-browser', ['build:bundle', 'http'], function() {
  return gulp.src('./conf/wdio.conf.js')
    .pipe(webdriver())
    .on('end', function() {
      server.close();
    });
});

gulp.task('test:e2e-node', ['build:lib'], function() {
  return gulp.src('./e2e-node/**/*.spec.js')
    .pipe(jasmine());
});

gulp.task('build', ['build:bundle', 'build:lib']);

gulp.task('test:e2e', ['test:e2e-browser', 'test:e2e-node']);

gulp.task('test:unit', []);//TODO

gulp.task('test', ['test:e2e', 'test:unit']);

gulp.task('default', ['test']);
