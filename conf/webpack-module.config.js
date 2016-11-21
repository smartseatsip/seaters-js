var fs = require('fs');
var webpack = require('webpack');
var webpackHelpers = require('./webpack-helpers');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

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
    ),
    new webpack.NormalModuleReplacementPlugin(/(\.s?css)|(\.html)$/, 'node-noop')
  ],
  module: {
    loaders: [
      webpackHelpers.replacePackageVersionLoader,
      webpackHelpers.replaceApiLocationLoader(false),
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
}
