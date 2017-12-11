import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import config from './config';
import api from './api';
import middleware, { errorHandler, logger } from './middleware';
import { initializeDb } from './lib';

const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
}

app.use(bodyParser.json(config.bodyParser));
app.use(helmet());
app.use(cors(config.cors));
app.use(config.rateLimit);
app.use(logger(config));

initializeDb(config, (db) => {
  app.use(config.prefix, middleware({ config, db }));
  app.use(config.prefix, api({ config, db }));
  app.use(errorHandler);
  app.listen(config.port, () => console.log(`server running at port ${config.port}`));
});

export default app;
