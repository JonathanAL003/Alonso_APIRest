const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para productos
router.get('/producto', productoController.obtenerTodos);
router.get('/producto/:id', productoController.obtenerPorId);
router.post('/producto', productoController.crearProducto);
router.put('/producto/:id', productoController.actualizarProducto);
router.delete('/producto/:id', productoController.eliminarProducto);

module.exports = router;
