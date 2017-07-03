import { Router } from 'express';
import todos from './todos';
import errorHandler from './errorHandler';
import logger from './logger';

export default function ({ config, db }) {
  const routes = Router();

  // Middleware goes here
  routes.use('/todos', todos({ config, db }));

  return routes;
}

export { errorHandler, logger };
