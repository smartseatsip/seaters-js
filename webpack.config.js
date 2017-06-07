const sharedModules = [
  // Typescript
  {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'awesome-typescript-loader'
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

module.exports = [

  // Module
  {

    context: `${__dirname}/src`,
    entry: './index',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters.module.js',
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    module: {
      rules: sharedModules.concat([])
    }
  },

  // Mock data module
  {

    context: `${__dirname}/mock-data`,
    entry: './index',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters-mock-data.module.js',
      libraryTarget: 'commonjs'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    module: {
      rules: sharedModules.concat([

      ])
    }
  },

  // Bundle
  {

    context: `${__dirname}/src`,
    entry: './index',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters.bundle.js',
      libraryTarget: 'var',
      library: 'SeatersSDK'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    module: {
      rules: sharedModules.concat([

      ])
    }
  },

  // Mock data bundle
  {

    context: `${__dirname}/mock-data`,
    entry: './index',
    target: 'node',
    output: {
      path: `${__dirname}/dist`,
      filename: 'seaters-mock-data.bundle.js',
      libraryTarget: 'var',
      library: 'SeatersSDKMockData'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'inline-source-map',
    module: {
      rules: sharedModules.concat([

      ])
    }
  }
];
