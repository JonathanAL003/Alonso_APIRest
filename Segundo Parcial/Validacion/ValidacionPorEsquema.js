const express = require('express');
const { validateProducto, validateProductMiddleware } = require('./esquema');
const app = express();
app.use(express.json());

// Manejador de ruta para procesar el formulario
app.post(
  '/producto',
  validateProducto,
  validateProductMiddleware,
  (req, res) => {
    console.log(req.body);
    res.json({ mensaje: 'Respuesta a peticion post' });
  }
);

// Inicia el servidor
app.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080');
});
