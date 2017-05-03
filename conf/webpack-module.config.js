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
    filename: './dist/seaters.module.js',
    libraryTarget: 'commonjs'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    )
    // webpackHelpers.noopStaticResources
  ],
  module: {
    preLoaders: webpackHelpers.allPreLoaders,
    loaders: webpackHelpers.allLoaders
  }
};
