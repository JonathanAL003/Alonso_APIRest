const express = require('express');
const router = express.Router();
const productoService = require('../services/productoService');

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
router.get("/producto", async (req, res) => {
  try {
    const products = await productoService.getAllProducts();
    res.json(products[0]);
  } catch (error) {
    res.status(500).json({ mensaje: "Error de base de datos" });
  }
});

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
router.get("/producto/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await productoService.getProductById(productId);
    if (product[0].length === 0) {
      res.status(404).json({ mensaje: "No existe el producto" });
    } else {
      res.json(product[0]);
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error de base de datos" });
  }
});

/**
* @swagger
* /producto/new:
*   post:
*     summary: Crea un nuevo producto.
*     description: Crea un nuevo producto con los datos proporcionados.
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               Id_Producto:
*                 type: integer
*               Nombre:
*                 type: string
*               Categoria:
*                 type: string
*               Descripcion:
*                 type: string
*               Precio:
*                 type: number
*               Valoracion:
*                 type: number
*               Ingredientes:
*                 type: string
*               Costo:
*                 type: number
*               Minutos:
*                 type: integer
*     responses:
*       200:
*         description: Operación exitosa. Devuelve el producto creado.
*       500:
*         description: Error de servidor al crear el producto.
*/
router.post("/producto/new", async (req, res) => {
  const productData = req.body;
  try {
    const result = await productoService.createProduct(productData);
    res.json(result[0]).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
* @swagger
* /producto/{id}:
*   put:
*     summary: Actualiza un producto por su ID.
*     description: Actualiza un producto según su ID con los datos proporcionados.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del producto a actualizar.
*         schema:
*           type: integer
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               Nombre:
*                 type: string
*               Categoria:
*                 type: string
*               Descripcion:
*                 type: string
*               Precio:
*                 type: number
*               Valoracion:
*                 type: number
*               Ingredientes:
*                 type: string
*               Costo:
*                 type: number
*               Minutos:
*                 type: integer
*     responses:
*       200:
*         description: Operación exitosa. Devuelve el producto actualizado.
*       500:
*         description: Error de servidor al actualizar el producto.
*/
router.put("/producto/:id", async (req, res) => {
  const productId = req.params.id;
  const updateFields = req.body;

  try {
    const result = await productoService.updateProduct(productId, updateFields);
    res.json(result[0]).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/**
* @swagger
* /producto/{id}:
*   delete:
*     summary: Elimina un producto por su ID.
*     description: Elimina un producto según su ID.
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID del producto a eliminar.
*         schema:
*           type: integer
*     responses:
*       200:
*         description: Operación exitosa. Devuelve un mensaje de éxito.
*       500:
*         description: Error de servidor al eliminar el producto.
*/
router.delete("/producto/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await productoService.deleteProduct(productId);
    if (result[0].affectedRows === 0) {
      res.status(404).json({ mensaje: "No existe el producto" });
    } else {
      res.json({ mensaje: "Registro eliminado con éxito" });
    }
  } catch (error) {
    res.status(500).json({ mensaje: "Error de base de datos" });
  }
});

module.exports = router;