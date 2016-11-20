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
      {
        test: /index\.ts$/,
        loader: 'string-replace',
        query: {
          search: '${package.version}',
          replace: require('../package.json').version
        }
      },
      {
        test: /seaters-client\.ts$/,
        loader: 'string-replace',
        query: {
          search: '${api.location}',
          replace: process.env['strs.api.location'] || '/api'
        }
      },
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
  },
  tslint: {
    failOnHint: true,
    emitErrors: true,
    formatter: 'verbose'
  }
}
