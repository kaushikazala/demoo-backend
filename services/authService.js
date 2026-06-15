import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Helper to generate JWT token
const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET || 'supersecretjwtkey12345!@#$%',
    { expiresIn: '7d' }
  );
};

export const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Generate JWT token
  const token = generateToken(user._id, user.email);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
