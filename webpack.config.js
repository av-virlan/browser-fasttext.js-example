const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './index.js',
  mode: 'production',
  module: {
    noParse: /browserfs\.js/,
  },
  resolve: {
    extensions: ['.js'],
    fallback: {
      'fs': 'browserfs/dist/shims/fs.js',
    }
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static' },
        { from: 'node_modules/browser-fasttext.js/fasttext_wasm.wasm'}
      ]
    })
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
};