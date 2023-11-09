const Producto = require('../models/productoModel');

const productoController = {
  obtenerTodos: (req, res) => {
    Producto.obtenerTodos((error, resultados) => {
      if (error) {
        res.status(500).json({ mensaje: 'Error de base de datos' });
      } else {
        res.json(resultados);
      }
    });
  },

  obtenerPorId: (req, res) => {
    const { id } = req.params;
    Producto.obtenerPorId(id, (error, resultados) => {
      if (error) {
        res.status(500).json({ mensaje: 'Error de base de datos' });
      } else {
        if (resultados.length === 0) {
          res.status(404).json({ mensaje: 'No existe el producto' });
        } else {
          res.json(resultados);
        }
      }
    });
  },

  crearProducto: (req, res) => {
    const nuevoProducto = new Producto(req.body);
    Producto.crearNuevo(nuevoProducto, (error, resultados) => {
      if (error) {
        res.status(500).json({ mensaje: 'Error de base de datos' });
      } else {
        res.status(201).json(resultados);
      }
    });
  },

  actualizarProducto: (req, res) => {
    const { id } = req.params;
    const productoActualizado = req.body;
    Producto.actualizarPorId(id, productoActualizado, (error, resultados) => {
      if (error) {
        res.status(500).json({ mensaje: 'Error de base de datos' });
      } else {
        res.json(resultados);
      }
    });
  },

  eliminarProducto: (req, res) => {
    const { id } = req.params;
    Producto.eliminarPorId(id, (error, resultados) => {
      if (error) {
        res.status(500).json({ mensaje: 'Error de base de datos' });
      } else {
        if (resultados.affectedRows === 0) {
          res.status(404).json({ mensaje: 'No existe el producto' });
        } else {
          res.json({ mensaje: 'Registro eliminado con éxito' });
        }
      }
    });
  },
};

module.exports = productoController;
