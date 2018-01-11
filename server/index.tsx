import * as express from 'express';
import hmr from './middleware/frontEnd';
import {config} from './config';

const isDev = process.env.NODE_ENV !== 'production';
const app = express();

hmr(app);

app.listen(config.port, config.host, (err: express.Errback) => {
  if (err) return errorHandler(err);
  console.log(`App started with config: `, config);
});

function errorHandler(e: express.Errback) {
  console.log(e);
}