import mongoose from 'mongoose';
import Joi from 'joi';

// Middleware to validate MongoDB ObjectId
export const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    return next(new Error('Invalid MongoDB ObjectId'));
  }
  next();
};

// Joi middleware to validate Todo request body
export const validateTodoBody = (req, res, next) => {
  const userSchema = Joi.object({
    name: Joi.string().trim().required().messages({
      'any.required': 'Name is required',
      'string.empty': 'Name cannot be empty',
    }),
    email: Joi.string().email().trim().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email format',
    }),
    phone: Joi.string()
      .pattern(/^[6-9]\d{9}$/)
      .required()
      .messages({
        'any.required': 'Phone number is required',
        'string.pattern.base': 'Phone must be a valid 10-digit Indian number starting with 6-9',
      }),
    date: Joi.date().required().messages({
      'any.required': 'Date is required',
    }),
  });

  const todoSchema = Joi.object({
    title: Joi.string().trim().required().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be empty',
    }),
    description: Joi.string().trim().required().messages({
      'any.required': 'Description is required',
      'string.empty': 'Description cannot be empty',
    }),
    users: Joi.array()
      .items(userSchema)
      .min(1)
      .max(4)
      .required()
      .messages({
        'any.required': 'Assigned users are required',
        'array.min': 'Todo must have at least 1 assigned user',
        'array.max': 'Todo cannot have more than 4 assigned users',
      }),
  });

  const { error } = todoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400);
    const errorDetails = error.details.map((err) => err.message).join('; ');
    return next(new Error(errorDetails));
  }

  next();
};
