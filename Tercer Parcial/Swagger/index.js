const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const PORT = 8080;

app.use(cors());
app.use(express.json());

const productoRoutes = require('./routes/productoRoutes');
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Productos',
      version: '1.0.0',
    },
  },
  apis: [
    `${path.join(__dirname, "./routes/productoRoutes.js")}`,
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/producto', productoRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
