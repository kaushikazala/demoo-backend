import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo Assignment API',
      version: '1.0.0',
      description: 'API documentation for the Todo assignment with User registration/login and Todo CRUD.',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        UserRegister: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        AssignedUser: {
          type: 'object',
          required: ['name', 'phone', 'email', 'date'],
          properties: {
            name: { type: 'string', example: 'Kaushika' },
            phone: { type: 'string', example: '9876543210' },
            email: { type: 'string', format: 'email', example: 'kaushik@example.com' },
            date: { type: 'string', format: 'date-time', example: '2026-06-15T18:00:00.000Z' },
          },
        },
        TodoRequest: {
          type: 'object',
          required: ['title', 'description', 'users'],
          properties: {
            title: { type: 'string', example: 'Complete Assignment' },
            description: { type: 'string', example: 'Build backend and frontend and deploy.' },
            users: {
              type: 'array',
              items: { $ref: '#/components/schemas/AssignedUser' },
              minItems: 1,
              maxItems: 4,
            },
          },
        },
        TodoResponse: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '648e42f9bcf01a41852d001a' },
            title: { type: 'string', example: 'Complete Assignment' },
            description: { type: 'string', example: 'Build backend and frontend and deploy.' },
            users: {
              type: 'array',
              items: { $ref: '#/components/schemas/AssignedUser' },
            },
            createdBy: { type: 'string', example: '648e42f9bcf01a41852d0015' },
            createdAt: { type: 'string', format: 'date-time', example: '2026-06-15T12:00:00.000Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2026-06-15T12:05:00.000Z' },
          },
        },
        ResponseWrapper: {
          type: 'object',
          properties: {
            data: { type: 'object', example: {} },
            status: { type: 'integer', example: 200 },
            error: { type: 'string', nullable: true, example: null },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export const serveSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
export default swaggerSpec;
