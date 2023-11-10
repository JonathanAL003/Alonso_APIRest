const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Endpoints relacionados con productos.
 */

/**
 * @swagger
 * /producto:
 *   get:
 *     summary: Obtiene todos los productos.
 *     description: Obtiene una lista de todos los productos.
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve la lista de productos.
 */
router.get("/", productoController.getAllProducts);

/**
 * @swagger
 * /producto/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID.
 *     description: Obtiene un producto según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Operación exitosa. Devuelve el producto correspondiente al ID proporcionado.
 *       404:
 *         description: No se encontró el producto con el ID proporcionado.
 */
router.get("/:id", productoController.getProductById);

// Agrega más rutas aquí

module.exports = router;
