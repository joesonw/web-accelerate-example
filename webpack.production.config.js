const path = require('path');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const fs = require('fs');
const dlls = fs.readdirSync(path.resolve(__dirname, 'dist/vendor/'))
              .filter(file => path.extname(file) === '.js')
              .map(file => path.basename(file, '.js'))

const dllReferencePlugins = dlls
  .map(dll =>
    new webpack.DllReferencePlugin({
        context: '.',
        manifest: require(`./dist/vendor/${dll}-manifest.json`),
    })
  );

module.exports = {
  plugins: dllReferencePlugins.concat([
    new ExtractTextPlugin('app.css'),
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
    new HtmlWebpackPlugin({
      vendors: dlls.map(dll => `vendor/${dll}.js`),
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ]),
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },
  devtool: 'hidden-source-map', 
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/styles'),
    ],
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass'),
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jpg$/,
        loader: 'file',
      },
    ],
  },
  entry: [
    path.resolve(__dirname, 'src/index.jsx'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
};
