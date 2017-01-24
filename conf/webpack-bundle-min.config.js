var bundleConfig = require('./webpack-bundle.config');
var webpackHelpers = require('./webpack-helpers');
bundleConfig.plugins = [webpackHelpers.minifyPlugin];
bundleConfig.output.filename = bundleConfig.output.filename.replace('.js', '.min.js');
delete bundleConfig.devtool;

module.exports = bundleConfig;