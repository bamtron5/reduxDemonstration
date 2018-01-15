const path = require('path');
const compression = require('compression');
import * as express from 'express';

module.exports = function addProdMiddlewares(app: express.Application, options: any) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'dist');

  app.use(compression());
  app.use(publicPath, express.static(outputPath));
  app.get('*', (req, res) => res.sendFile(path.resolve(outputPath, 'index.html')));
};
