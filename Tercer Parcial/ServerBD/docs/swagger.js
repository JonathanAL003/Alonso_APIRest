const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Productos',
      version: '1.0.0',
      description: 'API para gestionar productos',
    },
  },
  apis: ['./routes/*.js'], // Rutas donde se encuentran las especificaciones Swagger
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = swaggerDocs;
