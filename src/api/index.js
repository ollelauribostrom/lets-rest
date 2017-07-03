import { Router } from 'express';
import todos from './todos';

export default function ({ config, db }) {
  const api = Router();

  // API routes
  api.use('/todos', todos({ config, db }));

  // Expose something at root
  api.get('/', (req, res) => res.json({ message: 'Yay, API is up and running' }));

  return api;
}
