import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { responseFormatter, errorHandler } from './middlewares/responseFormatter.js';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import { serveSwagger } from './config/swagger.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// CORS configuration - allow all origins for development
app.use(cors());

// Body parser
app.use(express.json());

// Apply response formatter middleware globally
app.use(responseFormatter);

// Set up Swagger UI
serveSwagger(app);

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Base route redirection to swagger docs
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Handling 404 routes
app.use((req, res, next) => {
  res.status(404);
  next(new Error(`Route not found - ${req.originalUrl}`));
});

// Error handling middleware
app.use(errorHandler);

// Start listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
});
