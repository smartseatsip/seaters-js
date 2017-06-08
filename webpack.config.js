const webpackMerge = require('webpack-merge');
const TARGET = process.env.npm_lifecycle_event;

const sharedModules = [

  // TSLint
  {
    test: /\.ts$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      configuration: require('./tslint.json'),
      fix: true
    }
  },

  // ESLint
  {
    test: /\.js$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      fix: true,
      cache: true
    }
  },

  // Typescript
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader'
  },

  // SASS
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  },

  // CSS
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },

  // JSON
  {
    test: /\.json$/,
    loader: 'json-loader'
  },

  // Images
  {
    test: /\.jpg$/,
    loader: ['file-loader']
  },
  {
    test: /\.png$/,
    loader: ['url-loader?mimetype=image/png']
  },

  // Replace package version
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'string-replace-loader',
    query: {
      search: '${package.version}',
      replace: require('./package.json').version
    }
  },

  // Replace API location
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'string-replace-loader',
    query: {
      search: '${api.location}',
      replace: process.env.STRS_API_LOCATION || 'https://api.dev-seaters.com/api'
    }
  }
];

const sharedConfig = {
  entry: './index',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'inline-source-map',
  module: {
    rules: sharedModules.concat([])
  }
};

const moduleConfigs = [
  // Module
  webpackMerge(sharedConfig, {

    context: `${__dirname}/src`,
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters.module.js',
      libraryTarget: 'commonjs'
    }
  }),

  // Mock data module
  webpackMerge(sharedConfig, {

    context: `${__dirname}/mock-data`,
    entry: './index',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters-mock-data.module.js',
      libraryTarget: 'commonjs'
    }
  })
];

const bundleConfigs = [
  // Bundle
  webpackMerge(sharedConfig, {

    context: `${__dirname}/src`,
    entry: './index',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters.bundle.js',
      libraryTarget: 'var',
      library: 'SeatersSDK'
    }
  }),

  // Mock data bundle
  webpackMerge(sharedConfig, {

    context: `${__dirname}/mock-data`,
    entry: './index',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters-mock-data.bundle.js',
      libraryTarget: 'var',
      library: 'SeatersSDKMockData'
    }
  })
];

let mergedConfigs = moduleConfigs;
if (TARGET === 'build') {
  Array.prototype.push.apply(mergedConfigs, bundleConfigs);
}

module.exports = mergedConfigs;
