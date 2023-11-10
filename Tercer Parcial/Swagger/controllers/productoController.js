const promisePool = require('../db/connection');
const productoService = require('../services/productoService');

const getAllProducts = (req, res) => {
  productoService.getAllProducts()
    .then(results => res.json(results))
    .catch(error => res.status(500).json({ mensaje: "Error de base de datos" }));
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  productoService.getProductById(productId)
    .then(results => {
      if (results.length === 0) {
        res.status(404).json({ mensaje: "No existe el producto" });
      } else {
        res.json(results);
      }
    })
    .catch(error => res.status(500).json({ mensaje: "Error de base de datos" }));
};

// Agrega más controladores aquí

module.exports = {
  getAllProducts,
  getProductById,
  // Agrega más controladores aquí
};
