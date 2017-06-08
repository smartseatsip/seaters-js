const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const runSequence = require('run-sequence');

gulp.task('clean:precompile', () => gulp.src(['dist', 'doc'])
  .pipe(gulpPlugins.clean()));

gulp.task('clean:postcompile', () => gulp.src(['lib'])
  .pipe(gulpPlugins.clean()));

gulp.task('webpack', (cb) => webpack(require('./webpack.config'), cb));

const tsconfig = require('./tsconfig.json');
gulp.task('typings', [], () => gulp.src(tsconfig.files.concat('src/**/*.ts'))
  .pipe(gulpPlugins.typescript(tsconfig.compilerOptions))
  .dts.pipe(gulp.dest('./dist/')));

gulp.task('typedoc', () => gulp
  .src(['src/*.ts'])
  .pipe(gulpPlugins.typedoc({
    module: 'commonjs',
    target: 'es5',
    includeDeclarations: true,

    out: './doc',
    json: 'doc/data.json',
    readme: 'doc-readme.md',

    name: 'Seaters SDK',
    ignoreCompilerErrors: true,
    version: true
  })));

gulp.task('build', [], () => runSequence('clean:precompile', 'webpack', 'typings', 'typedoc', 'clean:postcompile'));
gulp.task('serve', [], () => runSequence('clean:precompile', 'webpack'));
