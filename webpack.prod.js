const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const errorOverlayPlugin = new ErrorOverlayPlugin();
const definePlugin = new webpack.DefinePlugin({
  API_URL: JSON.stringify("https://lms-syd2018.azurewebsites.net"),
  HOST_URL: JSON.stringify("http://lms.flypenguins.net")
});

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        use: ["eslint-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jp(e*)g|png|gif|svg|pdf|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {}
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          warnings: false,
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  },
  plugins: [htmlPlugin, errorOverlayPlugin, definePlugin]
};
