'use strict';

var fs = require('fs');
var webpack = require('webpack');
var webpackHelpers = require('./webpack-helpers');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(file => ['.bin'].indexOf(file) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  output: {
    filename: 'tmp/seaters.module.js',
    libraryTarget: 'commonjs'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [],
  module: {
    preLoaders: webpackHelpers.allPreLoaders,
    loaders: webpackHelpers.allLoaders
  }
};
