const { NODE_ENV } = process.env;
const GLOBAL_CSS_REGEXP = /\.global\.sass$/;
const CSS_REGEXP = /\.css$/;
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  target: 'node',
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.join(__dirname, '../src/server/server.js'),
  output: { path: path.resolve(__dirname, '../dist/server'), filename: 'server.js' },
  resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.sass'] },
  externals: [nodeExternals()],
  module: {
    rules: [{
      test: /\.[tj]sx?$/,
      loader: 'babel-loader',
    }, {
      test: /\.(css|scss|sass)$/i,
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          modules: {
            exportGlobals: true,
            mode: 'local',
            localIdentName: '[name]__[local]--[hash:base64:5]',
            auto: /\.module\.\w+$/i,
          },
        },
      }, 'sass-loader'],
      exclude: [GLOBAL_CSS_REGEXP],
    }, {
      test: GLOBAL_CSS_REGEXP,
      use: ['css-loader', 'sass-loader'],
    }, {
      test: /\.(png|jp(e*)g|svg|gif|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[hash]-[name].[ext]',
        },
      }],
    }, {
      test: /\.(mp3)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'img/[hash]-[name].[ext]',
        },
      }],
    }],
  },
  optimization: { minimize: false },
};
