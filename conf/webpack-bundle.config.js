var webpackHelpers = require('./webpack-helpers');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'dist/seaters.bundle.js',
    libraryTarget: 'var',
    library: 'SeatersSDK'
  },
  externals: {},
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    preLoaders: webpackHelpers.allPreLoaders,
    loaders: webpackHelpers.allLoaders
  }
};
