import { todos } from '../models';
import ApiError from './ApiError';

/**
 * Validate todo item
 * req.body must contain todo: { task }
 */
export function validateTodo(req, res, next) {
  const todo = req.body.todo;

  if (!todo) {
    return next(new ApiError({
      message: 'Please provide a todo item',
      status: 400,
    }));
  }

  if (!todo.task) {
    return next(new ApiError({
      message: 'Please provide a task for the todo item',
      status: 400,
    }));
  }

  return next();
}

/**
 * Find index of todo item based on /:id
 */
export function findIndex(req, res, next) {
  const index = todos.findIndex(todo => todo.id === parseInt(req.params.id, 10));

  if (index < 0) {
    return next(new ApiError({
      message: 'Can´t find that todo',
      status: 404,
    }));
  }

  res.locals.index = index;
  return next();
}

/**
 * Generate index (simplified)
 */
export function generateId(req, res, next) {
  const id = todos.length ? (todos[todos.length - 1].id + 1) : 1;
  res.locals.id = id;
  return next();
}
