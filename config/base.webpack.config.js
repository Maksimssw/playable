/**
 * Base Webpack Config
 */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const pjson = require('../package.json');
// Paths
const PATHS = {
  public: path.join(__dirname, '../public'),
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    main: path.resolve(PATHS.src, "index.js"),
  },
  output: {
    path: PATHS.dist,
    filename: "[name].bundle.[chunkhash].js",
  },
  resolve: {
    alias: {
      "@": PATHS.src,
    },
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["*.LICENSE.txt"],
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: pjson.name,
      template: path.resolve(PATHS.public, "./index.html"),
      filename: "index.html",
      inject: "body",
      platform: process.env.PLATFORM || "web",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: PATHS.public,
          to: PATHS.dist,
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // Fonts, SVG
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: "asset/inline",
      },
      // Images
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset/inline",
      },
      // Videos, Sounds
      {
        test: /\.(mp4|mp3)$/,
        type: "asset/inline",
      },
      // CSS, PostCSS
      {
        test: /\.(css)$/,
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
};