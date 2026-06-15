import express from 'express';
import {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
} from '../controllers/todoController.js';
import { protect } from '../middlewares/auth.js';
import { validateId, validateTodoBody } from '../middlewares/validator.js';

const router = express.Router();

// Apply auth middleware to all todo routes
router.use(protect);

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve list of todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query matching title or description
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseWrapper'
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoRequest'
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseWrapper'
 *       400:
 *         description: Validation error
 */
router.route('/')
  .get(getAllTodos)
  .post(validateTodoBody, createNewTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     responses:
 *       200:
 *         description: Todo details fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseWrapper'
 *       400:
 *         description: Invalid MongoDB ObjectId format
 *       404:
 *         description: Todo not found or user unauthorized
 *   put:
 *     summary: Edit an existing todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoRequest'
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseWrapper'
 *       400:
 *         description: Invalid ObjectId or request body validation failed
 *       404:
 *         description: Todo not found or user unauthorized
 *   delete:
 *     summary: Delete a todo by ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the todo
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseWrapper'
 *       400:
 *         description: Invalid MongoDB ObjectId format
 *       404:
 *         description: Todo not found or user unauthorized
 */
router.route('/:id')
  .get(validateId, getTodoById)
  .put(validateId, validateTodoBody, updateTodoById)
  .delete(validateId, deleteTodoById);

export default router;
