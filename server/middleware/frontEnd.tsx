import * as path from 'path';
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevMiddleWare from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
const webpackConfig:webpack.Configuration = require( './../../webpack/webpack.base');
const resolve = require('path').resolve;

export default function hmr(app: express.Application) {
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    const addProdMiddlewares = require('./prodMiddleware');
    addProdMiddlewares(app, {
      outputPath: path.join(__dirname, '../../dist'),
      publicPath: '/',
    });
  } else {
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevMiddleWare(compiler, {
      publicPath: webpackConfig.output.publicPath
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
      fs.readFile(path.join(__dirname, '../../client/app/index.html'), {}, (err, file) => {
        if (err) return res.sendStatus(404);
        res.send(file.toString());
      });
    });
  }
};