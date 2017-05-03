'use strict';

var bundleConfig = require('./webpack-bundle.config');
bundleConfig.plugins = [];
bundleConfig.output.filename = bundleConfig.output.filename.replace('.js', '.min.js');
delete bundleConfig.devtool;

module.exports = bundleConfig;
