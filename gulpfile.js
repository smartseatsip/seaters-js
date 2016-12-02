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
var rp = require('request-promise');
var fs = require('fs');

var server = undefined;

gulp.task('clean', function() {
  return gulp.src(['dist', 'errorShots', 'tmp'], {read:false})
    .pipe(clean());
});

gulp.task('build:bundle', ['clean'], function() {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-bundle.config.js')))
    .pipe(gulp.dest('.'));
});

gulp.task('build:module', ['clean'], function() {
  return gulp.src('src/index.ts')
    .pipe(webpack(require('./conf/webpack-module.config.js')))
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

gulp.task('http', function(done) {
  var app = connect()
    .use(serveStatic('./e2e-browser/fixtures'))
    .use(serveStatic('./dist'))
    .use('/components', serveStatic('./components'))
    .use('/assets', serveStatic('./assets'))
    .use('/examples', serveStatic('./examples'))
    .use('/api', proxy({
      target: 'https://api.dev-seaters.com',
      changeOrigin: true,
      xfwd: false,
      port: 443,
      https: true
    }));//TODO - remove as soon as cors is properly working

   server = http.createServer(app).listen(3000, done);
});

gulp.task('test:e2e-browser', ['build:bundle', 'http'], function() {
  return gulp.src('./conf/wdio.conf.js')
    .pipe(webdriver())
    .on('end', function() {
      server.close();
    });
});

gulp.task('test:e2e-node', ['build:module'], function() {
  return gulp.src('./e2e-node/**/*.spec.js')
    .pipe(jasmine());
});

gulp.task('build', ['build:bundle', 'build:module']);

gulp.task('test:e2e', ['test:e2e-browser', 'test:e2e-node']);

gulp.task('test:unit', []);//TODO

gulp.task('test', ['test:e2e', 'test:unit']);

gulp.task('update-translations', (done) => {

  var phraseappProjectId = 'd32ec100f389a6761a6acffc6a8a39c9';
  var phraseappReadKey = '763079fb340143044cfc63e8757e800d56f50a8d4da2d440436921864364361b';
  var baseUrl = 'https://api.phraseapp.com/api/v2'; 
  var phraseappHeaders = { 'Authorization': 'token '+phraseappReadKey };


  rp({
    method: 'GET',
    url: baseUrl + '/projects/' + phraseappProjectId + '/locales',
    headers: phraseappHeaders
  }).then(locales => {
    locales = JSON.parse(locales);
    return Promise.all(locales.map(locale => {
      return rp({
        method: 'GET',
        url: baseUrl + '/projects/' + phraseappProjectId + '/locales/' + locale.id  + '/download?file_format=json',
        headers: phraseappHeaders
      })
      .then(localeTranslations => {
        return {
          locale: locale,
          translations: JSON.parse(localeTranslations)
        };
      });
    }));
  })
  .then(localeTranslations => {
    var translationMap = {};
    localeTranslations.forEach(localeTranslation => {
      Object.keys(localeTranslation.translations).forEach(translationKey => {
        var translation = localeTranslation.translations[translationKey].message;
        // console.log('translation %s[%s] => %s', translationKey, localeTranslation.locale.code, translation);
        var translationEntry = translationMap[translationKey];
        if(!translationEntry) {
          translationEntry = translationMap[translationKey] = {
            key: translationKey,
            translations: []
          };
        }
        translationEntry.translations.push({
          locale: localeTranslation.locale.code,
          translation: translation
        });
      });
    });
    var translationArray = Object.keys(translationMap).map(tk => translationMap[tk]);
    fs.writeFileSync('./translations.json', JSON.stringify(translationArray));
  })
  .then(() => done(), (err) => done(err));
  
});

gulp.task('csvify-translations', () => {
  var translations = require('./translations.json');
  translations.map(t => {
    return {
      key: t.key,
      defaultTranslation: t.translations.filter(trl => trl.locale == 'en')[0].translation
    }
  }).forEach(trl => console.log('%s,"%s"', trl.key, trl.defaultTranslation.replace('"', '""')));
});

gulp.task('default', ['test']);