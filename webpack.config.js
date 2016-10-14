module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'dist/seaters.js',
    libraryTarget: 'var',
    library: 'SeatersSDK',
  },
  externals: {

  },
  resolve: {
    extensions: ['', '.ts']
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
          replace: require('./package.json').version
        }
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
