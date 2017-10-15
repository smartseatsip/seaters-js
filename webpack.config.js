const webpackMerge = require('webpack-merge');
const TSLintPlugin = require('tslint-webpack-plugin');

const sharedModules = [
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
    loader: 'string-replace-loader',
    query: {
      search: '${package.version}',
      replace: require('./package.json').version
    }
  },

  // Replace API location
  {
    test: /\.tsx?$/,
    loader: 'string-replace-loader',
    query: {
      search: '${api.location}',
      replace: process.env.STRS_API_LOCATION || 'https://api.dev-seaters.com/api'
    }
  }
];

const sharedPlugins = [
  new TSLintPlugin({
    config: './tslint.json',
    files: ['./src/**/*.ts'],
    format: 'stylish',
    fix: true
  })
];

const sharedConfig = {
  entry: './index',
  output: {
    path: `${__dirname}/dist`,
    publicPath: `${__dirname}/dist`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    rules: sharedModules.concat([])
  },
  plugins: sharedPlugins
};

module.exports = [
  // Module
  webpackMerge(sharedConfig, {
    context: `${__dirname}/src`,
    target: 'node',
    output: {
      filename: 'seaters.module.js',
      libraryTarget: 'commonjs'
    }
  }),

  // Bundle
  webpackMerge(sharedConfig, {
    context: `${__dirname}/src`,
    entry: './index',
    output: {
      filename: 'seaters.bundle.js',
      libraryTarget: 'var',
      library: 'SeatersSDK'
    }
  })
];
