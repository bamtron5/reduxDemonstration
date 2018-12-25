const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const root = path.join(__dirname, '../');

const entry = process.env.NODE_ENV === 'production'
  ? [ path.join(root, 'client/app/index.tsx') ]
  : [
    'webpack-hot-middleware/client?reload=true',
    path.join(root, 'client/app/index.tsx')
  ];

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: entry,
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
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    process.env.NODE_ENV === 'production' ? () => null : new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(root, 'client/app/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    })
  ]
};