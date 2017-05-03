'use strict';

var fs = require('fs');
var webpack = require('webpack');
var webpackHelpers = require('./webpack-helpers');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(file => ['.bin'].indexOf(file) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

module.exports = {
  entry: './mock-data/index.ts',
  target: 'node',
  output: {
    filename: 'tmp/seaters-mock-data.module.js',
    libraryTarget: 'commonjs'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [],
  module: {
    loaders: [webpackHelpers.tsLoader]
  }
};
