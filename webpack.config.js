const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '8888';

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  resolve: {
    root: path.resolve(__dirname, 'src'),
    extensions: ['', '.js', '.jsx'],
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'src/styles'),
    ],
  },
  devtool: 'source-map',
  cache: true,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
            'style-loader',
            'css-loader?modules&' +
            'importLoaders=1&' +
            'localIdentName=[name]__[local]___[hash:base64:5]!sass',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.jpg$/,
        loader: 'url',
      },
    ],
  },
  entry: [
    'babel-polyfill',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index.jsx'),
  ],
  devServer: {
    contentBase: './www',
    quiet: true,
    historyApiFallback: true,
    hot: true,
    port: PORT,
    host: HOST,
    noInfo: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'app.js',
  },
};
