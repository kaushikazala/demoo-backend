import * as todoService from '../services/todoService.js';

export const getAllTodos = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const query = req.query.q || '';
    const todos = await todoService.getTodos(userId, query);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const todo = await todoService.getTodoDetails(userId, todoId);
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const createNewTodo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todo = await todoService.createTodo(userId, req.body);
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodoById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const todo = await todoService.updateTodo(userId, todoId, req.body);
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodoById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const todoId = req.params.id;
    const result = await todoService.deleteTodo(userId, todoId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
