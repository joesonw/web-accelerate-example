const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        drop_console: true,
        drop_debugger: true,
      },
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'dist/vendor/[name]-manifest.json'),
      name: '[name]',
      context: '.',
    }),
  ],
  devtool: 'hidden-source-map', 
  entry: {
    'react': ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/vendor'),
    filename: '[name].[hash].js',
    library: '[name]',
  },
};
