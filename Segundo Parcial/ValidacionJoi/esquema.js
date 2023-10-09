const Joi = require('joi');

const productoSchema = Joi.object({
  Id_Producto: Joi.number().required(),
  Nombre: Joi.string().required(),
  Categoria: Joi.string().required(),
  Descripcion: Joi.string().required(),
  Precio: Joi.number().required(),
  Valoracion: Joi.number().required(),
  Ingredientes: Joi.string().required(),
  Costo: Joi.number().required(),
  Minutos: Joi.number().required()
});

module.exports = {
  productoSchema,
};