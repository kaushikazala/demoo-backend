import { registerUser, loginUser } from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required');
    }

    const result = await registerUser({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
