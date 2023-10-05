const { checkSchema, validationResult } = require('express-validator');

const productoSchema = {
  Id_Producto: {
    isNumeric: true,
    errorMessage: 'Id_Producto debe ser un número',
  },
  Precio: {
    isDecimal: true,
    errorMessage: 'Precio debe ser un número decimal',
  },
  Valoracion: {
    isDecimal: true,
    errorMessage: 'Valoracion debe ser un número decimal',
  },
  Costo: {
    isDecimal: true,
    errorMessage: 'Costo debe ser un número decimal',
  },
  Minutos: {
    isDecimal: true,
    errorMessage: 'Minutos debe ser un número decimal',
  },
};

const validateProducto = checkSchema(productoSchema);

const validateProductMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    const errorObject = {};
    errors.array().forEach((error) => {
      errorObject[error.param] = error.msg;
    });
    next(errorObject); // Envía el error como un objeto al manejador de errores
  }
};

module.exports = {
  validateProducto,
  validateProductMiddleware,
};