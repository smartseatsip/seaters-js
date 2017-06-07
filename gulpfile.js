'use strict';

var DEFAULT_PORT = 3000;

var gulp = require('gulp');
var webpack = require('webpack-stream');
var http = require('http');
var connect = require('connect');
var serveStatic = require('serve-static');
var exec = require('child_process').exec;
// We need runSequence until gulp4.0 is released
var runSequence = require('run-sequence');

var gulpPlugins = require('gulp-load-plugins')();

function gulpExec(cmd, args, gulpCallback) {
  let fullCmd = cmd;
  if (args && args.length > 0) {
    fullCmd = fullCmd + ' ' + args.join(' ');
  }
  exec(fullCmd, null, function (err, stdout, stderr) {
    if(err) {
      console.error('A problem occurred while executing command (%s):\n%s', cmd, stderr);
      gulpCallback(err);
    } else {
      console.log(stdout);
      gulpCallback();
    }
  });
}

var server = undefined;

gulp.task('clean:precompile', function (cb) {
  return gulp.src(['lib', 'dist', 'errorShots', 'tmp'], { read: false })
    .pipe(gulpPlugins.clean());
});

gulp.task('clean:postcompile', function () {
  return gulp.src(['tmp'], { read: false })
    .pipe(gulpPlugins.clean());
});

gulp.task('tslint', function () {
  return gulp.src([
    'src/**/*.ts',
    'mock-data/**/*.ts',
    '!mock-data/**/*.d.ts'
  ], { base: '.' })
    .pipe(gulpPlugins.tslint({
      formatter: 'stylish'
    }))
    .pipe(gulpPlugins.tslint.report(gulpPlugins.tslintStylish, {
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
    .pipe(gulpPlugins.eslint())
    .pipe(gulpPlugins.eslint.format())
    .pipe(gulpPlugins.eslint.failAfterError());
});

gulp.task('build:bundle', [], function () {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-bundle.config.js')))
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
    .pipe(gulpPlugins.typescript(tsconfig.compilerOptions))
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
    .pipe(gulpPlugins.webdriver())
    .on('end', function () {
      server.close();
    });
});

gulp.task('test:e2e-node', ['build:module'], function () {
  return gulp.src('./e2e-node/**/*.spec.js')
    .pipe(gulpPlugins.jasmine());
});

gulp.task('build:babel', [], function () {
  return gulp.src('tmp/**/*.js')
    .pipe(gulpPlugins.sourcemaps.init())
    .pipe(gulpPlugins.babel({
      presets: ['es2015'],
      compact: false,
      sourceMaps: true
    }))
    .pipe(gulpPlugins.sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('build:uglify', [], function () {
  return gulp.src('dist/*.bundle.js')
    .pipe(gulpPlugins.uglify())
    .pipe(gulpPlugins.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [], function (cb) {
  runSequence(
    'clean:precompile',
    'tslint',
    'build:bundle',
    'build:module',
    'build:typings',
    'build:mock-bundle',
    'build:mock-module',
    'build:babel',
    'build:uglify',
    'clean:postcompile',
    cb
  );
});

gulp.task('test:e2e', ['test:e2e-browser', 'test:e2e-node']);

// TODO
gulp.task('test:unit', []);

gulp.task('test', ['test:e2e', 'test:unit']);

gulp.task('clean:doc', [], function () {
  return gulp.src(['tmp'], { read: false })
    .pipe(gulpPlugins.clean());
});

gulp.task('doc', ['clean:doc'], function (cb) {
  // gulp-typedoc package seems pretty broken - use exec typedoc instead
  gulpExec('./node_modules/typedoc/bin/typedoc', [
    '--out doc/',
    '--mode file',
    '--name "Seaters SDK"',
    '--readme doc-readme.md',
    '--json doc/data.json',
    'src/index.ts'
  ], cb);
});

gulp.task('default', ['test']);
