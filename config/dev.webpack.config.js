/**
 * Development Webpack Config
 */

const webpack = require("webpack");
const { merge } = require("webpack-merge");

// Base config
const baseWebpackConfig = require("./base.webpack.config");

// Development
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: 8080,
        open: true,
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        }),
    ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
