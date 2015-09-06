var webpack = require("webpack");

module.exports = {
  name: "morph-forms",
  entry: [
    "webpack-dev-server/client?http://localhost:8080/build/",
    "webpack/hot/only-dev-server",
    "./examples/app.jsx"
  ],
  output: {
    publicPath: "http://localhost:8080/build",
    path: "./examples/build/",
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"],
    alias: {
      "morph-forms": "../index"
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "react-hot!babel?stage=0",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};