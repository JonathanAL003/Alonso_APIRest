const promisePool = require('../connection');

/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise} Una promesa que resuelve con la lista de productos.
 */
async function getAllProducts() {
  const [products] = await promisePool.query('SELECT * FROM producto');
  return [products];
}

/**
 * Obtiene un producto por su ID.
 * @param {number} productId - ID del producto a obtener.
 * @returns {Promise} Una promesa que resuelve con el producto correspondiente al ID proporcionado.
 */
async function getProductById(productId) {
  const [product] = await promisePool.query('SELECT * FROM producto WHERE Id_Producto = ?', [productId]);
  return [product];
}

/**
 * Crea un nuevo producto en la base de datos.
 * @param {Object} productData - Datos del nuevo producto.
 * @returns {Promise} Una promesa que resuelve con el producto creado.
 */
async function createProduct(productData) {
  const result = await promisePool.query('INSERT INTO producto SET ?', [productData]);
  return [result];
}

/**
 * Actualiza un producto por su ID en la base de datos.
 * @param {number} productId - ID del producto a actualizar.
 * @param {Object} updateFields - Campos a actualizar en el producto.
 * @returns {Promise} Una promesa que resuelve con el producto actualizado.
 */
async function updateProduct(productId, updateFields) {
  const [product] = await promisePool.query('UPDATE producto SET ? WHERE Id_Producto = ?', [updateFields, productId]);
  return [product];
}

/**
 * Elimina un producto por su ID de la base de datos.
 * @param {number} productId - ID del producto a eliminar.
 * @returns {Promise} Una promesa que resuelve con el resultado de la eliminación.
 */
async function deleteProduct(productId) {
  const result = await promisePool.query('DELETE FROM producto WHERE Id_Producto = ?', [productId]);
  return [result];
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};