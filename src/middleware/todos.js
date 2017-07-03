import { Router } from 'express';
import { findIndex, validateTodo, generateId } from '../lib/validator';

// eslint-disable-next-line no-unused-vars
export default function ({ config, db }) {
  const router = Router();

  // Middleware for /todos
  router.post('/', validateTodo, generateId);
  router.use('/:id', findIndex);
  router.put('/:id', validateTodo);

  return router;
}
