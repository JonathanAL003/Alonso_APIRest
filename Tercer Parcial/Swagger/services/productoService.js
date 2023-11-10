const promisePool = require('../db/connection');

const getAllProducts = () => {
  return promisePool.query('SELECT * FROM producto');
};

const getProductById = (productId) => {
  return promisePool.query('SELECT * FROM producto WHERE Id_Producto = ?', [productId]);
};

// Agrega más servicios aquí

module.exports = {
  getAllProducts,
  getProductById,
  // Agrega más servicios aquí
};
