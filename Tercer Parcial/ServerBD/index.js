const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');
const productoRoutes = require('./api/routes/productoRoutes');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUI.serve);
app.use(morgan('combined', { stream: accessLogStream }));
app.use('/api-docs', swaggerUI.setup(swaggerDocs));
app.use('/api/productos', productoRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});