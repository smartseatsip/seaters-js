var webpackHelpers = require('./webpack-helpers');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'dist/seaters.bundle.js',
    libraryTarget: 'var',
    library: 'SeatersSDK',
  },
  externals: {

  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    preLoaders: [
      {
        test: '/\.ts$/',
        loader: 'tslint-loader'
      }
    ],
    loaders: [
      webpackHelpers.replacePackageVersionLoader,
      webpackHelpers.replaceApiLocationLoader(true),
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['css', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  tslint: {
    failOnHint: true,
    emitErrors: true,
    formatter: 'verbose'
  }
}
