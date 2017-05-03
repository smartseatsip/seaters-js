'use strict';

var DEFAULT_PORT = 3000;

var gulp = require('gulp');
var webdriver = require('gulp-webdriver');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var gulpTsLint = require('gulp-tslint');
var stylish = require('gulp-tslint-stylish');
var eslint = require('gulp-eslint');
var typescript = require('gulp-typescript');
var jasmine = require('gulp-jasmine');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
// We need runSequence until gulp4.0 is released
var runSequence = require('run-sequence');

var server = undefined;

gulp.task('clean:precompile', function (cb) {
  return gulp.src(['lib', 'dist', 'errorShots', 'tmp'], { read: false })
    .pipe(clean());
});

gulp.task('clean:postcompile', function () {
  return gulp.src(['tmp'], { read: false })
    .pipe(clean());
});

gulp.task('tslint', function () {
  return gulp.src([
    'src/**/*.ts',
    'mock-data/**/*.ts'
  ], { base: '.' })
    .pipe(gulpTsLint({
      formatter: 'stylish'
    }))
    .pipe(gulpTsLint.report(stylish, {
      emitError: false,
      sort: true,
      bell: true,
      fullPath: false,
      colors: true,
      summarizeFailureOutput: false
    }));

});

gulp.task('eslint', [], function () {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build:bundle', [], function () {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-bundle.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:bundle-min', [], function () {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-bundle-min.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:module', [], function () {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-module.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:mock-bundle', [], function () {
  return gulp.src('mock-data/index.ts')
    .pipe(webpack(require('./conf/webpack-mock-bundle.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:mock-module', [], function () {
  return gulp.src('mock-data/index.ts')
    .pipe(webpack(require('./conf/webpack-mock-module.config.js')))
    .pipe(gulp.dest('.'));
});

var tsconfig = require('./tsconfig.json');
gulp.task('build:typings', [], function () {
  return gulp.src(tsconfig.files.concat('src/**/*.ts', '!**/*.spec.ts'))
    .pipe(typescript(tsconfig.compilerOptions))
    .dts.pipe(gulp.dest('./dist/'));
});

gulp.task('http', [], function (done) {
  var app = connect()
    .use(serveStatic('./e2e-browser/fixtures'))
    .use(serveStatic('./dist'))
    .use('/examples', serveStatic('./examples'));

  server = http.createServer(app).listen(DEFAULT_PORT, done);
});

gulp.task('test:e2e-browser', ['build:bundle', 'http'], function () {
  return gulp.src('./conf/wdio.conf.js')
    .pipe(webdriver())
    .on('end', function () {
      server.close();
    });
});

gulp.task('test:e2e-node', ['build:module'], function () {
  return gulp.src('./e2e-node/**/*.spec.js')
    .pipe(jasmine());
});

gulp.task('build:babel', [], function () {
  return gulp.src('tmp/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [], function (cb) {
  runSequence(
    'clean:precompile',
    'tslint',
    'build:bundle',
    'build:bundle-min',
    'build:module',
    'build:typings',
    'build:mock-bundle',
    'build:mock-module',
    'build:babel',
    'clean:postcompile',
    cb
  );
});

gulp.task('test:e2e', ['test:e2e-browser', 'test:e2e-node']);

// TODO
gulp.task('test:unit', []);

gulp.task('test', ['test:e2e', 'test:unit']);

gulp.task('default', ['test']);
