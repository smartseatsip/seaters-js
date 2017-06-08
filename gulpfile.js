const gulp = require('gulp');
const gulpPlugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const runSequence = require('run-sequence');
const { exec } = require('child_process');

const DEFAULT_PORT = 3000;

function gulpExec(cmd, args, gulpCallback) {
  let fullCmd = cmd;
  if (args && args.length > 0) {
    fullCmd = `${ fullCmd } ${ args.join(' ') }`;
  }
  exec(fullCmd, null, (err, stdout, stderr) => {
    if (err) {
      console.error('A problem occurred while executing command (%s):\n%s', cmd, stderr);
      gulpCallback(err);
    } else {
      console.log(stdout);
      gulpCallback();
    }
  });
}

gulp.task('clean:precompile', () => gulp.src(['dist', 'doc'])
  .pipe(gulpPlugins.clean()));

gulp.task('clean:postcompile', () => gulp.src(['lib'])
  .pipe(gulpPlugins.clean()));

gulp.task('webpack', (cb) => webpack(require('./webpack.config'), cb));

const tsconfig = require('./tsconfig.json');
gulp.task('typings', [], () => gulp.src(tsconfig.files.concat('src/**/*.ts'))
  .pipe(gulpPlugins.typescript(tsconfig.compilerOptions))
  .dts.pipe(gulp.dest('./dist/')));

gulp.task('typedoc', (cb) => {
  gulpExec('./node_modules/typedoc/bin/typedoc', [
    '--out doc/',
    '--mode file',
    '--name "Seaters SDK"',
    '--readme doc-readme.md',
    '--json doc/data.json',
    'src/index.ts'
  ], cb);
});

gulp.task('http', gulpPlugins.serve({
  root: ['examples'],
  port: DEFAULT_PORT
}));

// Don't use these directly, use the npm scripts instead
gulp.task('build', [], () => runSequence('clean:precompile', 'webpack', 'typings', 'typedoc', 'clean:postcompile'));
gulp.task('serve:build', [], () => runSequence('clean:precompile', 'webpack'));
gulp.task('serve:examples', [], () => runSequence('http'));
