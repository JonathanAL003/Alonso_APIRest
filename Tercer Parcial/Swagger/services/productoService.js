const promisePool = require('../db/connection');

const getAllProducts = () => {
  return promisePool.query('SELECT * FROM producto');
};

const getProductById = (productId) => {
  return promisePool.query('SELECT * FROM producto WHERE Id_Producto = ?', [productId]);
};

const createProduct = (productData) => {
  const { Id_Producto, Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos } = productData;
  return promisePool.query('INSERT INTO producto VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [Id_Producto, Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos]);
};

const updateProduct = (productId, updateFields) => {
  let sql = "UPDATE producto SET ";
  const values = [];

  for (const key in updateFields) {
    if (updateFields.hasOwnProperty(key)) {
      sql += `${key} = ?, `;
      values.push(updateFields[key]);
    }
  }

  sql = sql.slice(0, -2);
  sql += ` WHERE Id_Producto = ?`;
  values.push(productId);

  return promisePool.query(sql, values);
};

const deleteProduct = (productId) => {
  return promisePool.query('DELETE FROM producto WHERE Id_Producto = ?', [productId]);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};