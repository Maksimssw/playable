/**
 * Production Webpack Config
 */
process.env.PLATFORM = "dapi";

const {merge} = require("webpack-merge");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const TerserPlugin = require("terser-webpack-plugin");

// Base config
const baseWebpackConfig = require("./base.webpack.config");

const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/main.+[.]js$/],
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});