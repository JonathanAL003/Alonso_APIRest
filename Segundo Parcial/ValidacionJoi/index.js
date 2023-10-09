const express = require('express');
const Joi = require('joi');
const { productoSchema } = require('./esquema');
const app = express();
app.use(express.json());

// Middleware de validación utilizando Joi
const validateProductMiddleware = (req, res, next) => {
  const { error } = productoSchema.validate(req.body);
  console.log(error)
  if (!error) {
    next();
  } else {
    res.status(400).json({ error: error.details[0].message });
  }
};

// Manejador de ruta para procesar el formulario
app.post('/producto', validateProductMiddleware, (req, res) => {
  const producto = req.body;
  console.log(producto);
  res.json({ mensaje: 'Respuesta a petición POST', producto: producto });
});

// Inicia el servidor
app.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080');
});
