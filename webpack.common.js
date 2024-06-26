const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const Dotenv = require("dotenv-webpack")
const WorkboxPlugin = require("workbox-webpack-plugin")

module.exports = (env) => ({
  context: __dirname,
  entry: {
    browserMain: "./src/main/index.tsx",
    browserAuth: "./src/auth/index.tsx",
    browserCommunity: "./src/community/index.tsx",
  },
  output: {
    filename: "[name]-[chunkhash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)$/,
        loader: "url-loader",
      },
    ],
  },
  resolve: {
    modules: ["src", "node_modules", "src/main", "src/common"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "edit.html",
      chunks: ["browserMain"],
      template: path.join(__dirname, "public", "edit.html"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "auth.html",
      chunks: ["browserAuth"],
      template: path.join(__dirname, "public", "auth.html"),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      filename: "community.html",
      chunks: ["browserCommunity"],
      template: path.join(__dirname, "public", "community.html"),
    }),
    ...(env.electron
      ? []
      : [
          new WorkboxPlugin.GenerateSW({
            maximumFileSizeToCacheInBytes: 50000000,
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
              {
                urlPattern: /^\/.*$/,
                handler: "StaleWhileRevalidate",
              },
              {
                urlPattern: /^.+\.sf2$/,
                handler: "StaleWhileRevalidate",
              },
              {
                urlPattern: /^https:\/\/fonts\.googleapis\.com/,
                handler: "StaleWhileRevalidate",
              },
              {
                urlPattern: /^https:\/\/fonts\.gstatic\.com/,
                handler: "StaleWhileRevalidate",
              },
            ],
          }),
        ]),
  ],
})
