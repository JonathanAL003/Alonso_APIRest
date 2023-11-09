const connection = require('../../config/database');

class Producto {
  constructor(producto) {
    this.Id_Producto = producto.Id_Producto;
    this.Nombre = producto.Nombre;
    this.Categoria = producto.Categoria;
    this.Descripcion = producto.Descripcion;
    this.Precio = producto.Precio;
    this.Valoracion = producto.Valoracion;
    this.Ingredientes = producto.Ingredientes;
    this.Costo = producto.Costo;
    this.Minutos = producto.Minutos;
  }

  static obtenerTodos(callback) {
    connection.query('SELECT * FROM producto', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static obtenerPorId(id, callback) {
    connection.query('SELECT * FROM producto WHERE Id_Producto = ?', [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static crearNuevo(producto, callback) {
    connection.query('INSERT INTO producto SET ?', producto, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static actualizarPorId(id, producto, callback) {
    connection.query('UPDATE producto SET ? WHERE Id_Producto = ?', [producto, id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }

  static eliminarPorId(id, callback) {
    connection.query('DELETE FROM producto WHERE Id_Producto = ?', [id], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
}

module.exports = Producto;
