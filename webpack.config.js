var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: './dist/bundle.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.ts', '.tsx']
  },

  module: {
    loaders: [{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' }],
    preLoaders: [{ test: /\.js$/, loader: 'source-map-loader'}]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-redux": "ReactRedux"
  }
};
