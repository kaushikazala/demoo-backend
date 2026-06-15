import Todo from '../models/todo.js';

export const getTodos = async (userId, searchQuery = '') => {
  const query = { createdBy: userId };

  if (searchQuery) {
    const regex = new RegExp(searchQuery, 'i');
    query.$or = [
      { title: { $regex: regex } },
      { description: { $regex: regex } },
    ];
  }

  // Sort by updatedAt descending to show recently edited todos first
  return await Todo.find(query).sort({ updatedAt: -1 });
};

export const getTodoDetails = async (userId, todoId) => {
  const todo = await Todo.findOne({ _id: todoId, createdBy: userId });
  if (!todo) {
    throw new Error('Todo not found or you do not have permission');
  }
  return todo;
};

export const createTodo = async (userId, todoData) => {
  const { title, description, users } = todoData;
  const newTodo = await Todo.create({
    title,
    description,
    users,
    createdBy: userId,
  });
  return newTodo;
};

export const updateTodo = async (userId, todoId, todoData) => {
  const { title, description, users } = todoData;

  const todo = await Todo.findOne({ _id: todoId, createdBy: userId });
  if (!todo) {
    throw new Error('Todo not found or you do not have permission');
  }

  todo.title = title;
  todo.description = description;
  todo.users = users;

  return await todo.save();
};

export const deleteTodo = async (userId, todoId) => {
  const todo = await Todo.findOneAndDelete({ _id: todoId, createdBy: userId });
  if (!todo) {
    throw new Error('Todo not found or you do not have permission');
  }
  return { message: 'Todo deleted successfully' };
};
