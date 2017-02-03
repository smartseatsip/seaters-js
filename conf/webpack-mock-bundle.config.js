var webpackHelpers = require('./webpack-helpers');

module.exports = {
  entry: './mock-data/index.ts',
  output: {
    filename: 'dist/seaters-mock-data.bundle.js',
    libraryTarget: 'var',
    library: 'SeatersSDKMockData',
  },
  externals: {

  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [webpackHelpers.tsLoader]
  },
  tslint: {
    failOnHint: true,
    emitErrors: true,
    formatter: 'verbose'
  }
}
