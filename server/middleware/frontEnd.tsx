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
    const compiler:any = webpack(webpackConfig);
    const middleware = webpackDevMiddleWare(compiler, {
      publicPath: webpackConfig.output.publicPath
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));

    const fs = middleware.fileSystem;

    app.get('*', (req, res) => {
      const filePath = path.resolve(process.cwd(), 'dist/index.html').toString();
      fs.readFile(filePath, 'utf8', (err, file) => {
        if (err) return res.send('bad route').status(404);
        res.send(file.toString());
      });
    });
  }
};