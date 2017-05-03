'use strict';

var webpack = require('webpack');

exports.allPreLoaders = [];

exports.replacePackageVersionLoader = {
  test: /index\.ts$/,
  loader: 'string-replace',
  query: {
    // eslint-disable-next-line no-template-curly-in-string
    search: '${package.version}',
    replace: require('../package.json').version
  }
};

var defaultApiPrefix = 'https://api.dev-seaters.com/api';
exports.replaceApiLocationLoader = {
  test: /seaters-client\.ts$/,
  loader: 'string-replace',
  query: {
    // eslint-disable-next-line no-template-curly-in-string
    search: '${api.location}',
    // eslint-disable-next-line no-process-env
    replace: process.env.STRS_API_LOCATION || defaultApiPrefix
  }
};

exports.htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader'
};

exports.cssLoader = {
  test: /\.css$/,
  loader: 'css-loader'
};

exports.sassLoader = {
  test: /\.scss$/,
  loaders: ['css', 'sass']
};

exports.jsonLoader = {
  test: /\.json$/,
  loader: 'json-loader'
};

exports.tsLoader = {
  test: /\.ts$/,
  loader: 'awesome-typescript-loader'
};

exports.allLoaders = [
  exports.replacePackageVersionLoader,
  exports.replaceApiLocationLoader,
  exports.htmlLoader,
  exports.cssLoader,
  exports.sassLoader,
  exports.jsonLoader,
  exports.tsLoader
];
