const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv');

// https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  const obj = prev;
  obj[`process.env.${next}`] = JSON.stringify(env[next]);
  return obj;
}, {});

module.exports = {
  entry: './src/app/index.jsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.css$|\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'pubTest/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};
