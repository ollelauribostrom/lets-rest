import { Router } from 'express';
import { todos } from '../models';

export default function ({ config, db }) {
  const router = Router();

  // GET: /todos
  router.get('/', (req, res) => res.json(todos));

  // GET: /todos/:id
  router.get('/:id', (req, res) => res.json(todos[res.locals.index]));

  // POST: /todos
  router.post('/', (req, res) => {
    todos.push({
      ...req.body.todo,
      id: res.locals.id,
    });
    res.sendStatus(201);
  });

  // PUT: /todos/:id
  router.put('/:id', (req, res) => {
    todos[res.locals.index].task = req.body.todo.task;
    res.sendStatus(204);
  });

  // DELETE: /todos/:id
  router.delete('/:id', (req, res) => {
    todos.splice(res.locals.index, 1);
    res.sendStatus(204);
  });

  return router;
}
