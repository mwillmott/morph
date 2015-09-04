var webpack = require('webpack');

module.exports = {
  name: "morph-forms",
  entry: "./index.js",
  output: {
    path: "./lib",
    filename: "morph-forms.js",
    libraryTarget: "umd"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  externals: ["react", "lodash"],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel?stage=0",
        exclude: /node_modules/
      }
    ]
  }
};