import RateLimit from 'express-rate-limit';
import path from 'path';

export default {
  port: process.env.PORT || 5000,
  prefix: process.env.PREFIX || '/api',
  dbAddress: process.env.DBADRESS,
  bodyParser: { limit: '100kb' },
  cors: { exposedHeaders: ['Link'] },
  logDirectory: path.join(__dirname, '/../../logs'),
  rateLimit: new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0,
  }),
};
