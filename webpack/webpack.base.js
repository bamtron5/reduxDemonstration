const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = path.join(__dirname, '../');

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(root, 'client/app/index.tsx')
  ],
  output: {
    path: path.join(root, 'dist'),
    filename: 'app.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx$/, use: 'awesome-typescript-loader' },
      { test: /\.html$/, use: 'html-loader' }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      inject: true, // Inject all files that are generated by webpack, e.g. bundle.js
      template: path.join(root, 'client/app/index.html')
    }),
  ]
};