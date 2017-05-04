'use strict';

var webpackHelpers = require('./webpack-helpers');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'tmp/seaters.bundle.js',
    libraryTarget: 'var',
    library: 'SeatersSDK'
  },
  externals: {},
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    preLoaders: webpackHelpers.allPreLoaders,
    loaders: webpackHelpers.allLoaders
  }
};
