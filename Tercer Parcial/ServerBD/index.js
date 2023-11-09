const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.use(cors());
app.use(express.json());

const promisePool = require('./connection.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Productos',
      version: '1.0.0',
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve);
app.get("/api-docs", swaggerUI.setup(swaggerDocs));

app.get('/', function (req, res) {
  res.send('hello, world!');
});

app.listen(8080, () => {
  console.log("servidor express escuchando en el puerto 8080");
});

var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdweb'
});

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

app.get("/producto", (req, res) => {
  connection.query('SELECT * FROM producto', (error, results) => {
    if (error) {
      res.status(500).json({ mensaje: "Error de base de datos" });
    } else {
      res.json(results);
    }
  });
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

app.get("/producto/:id", (req, res) => {
  const productId = req.params.id;
  console.log(req.params.id);
  connection.query('SELECT * FROM producto WHERE Id_Producto = ?', [productId], (error, results) => {
    if (error) {
      res.status(500).json({ mensaje: "Error de base de datos" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ mensaje: "No existe el producto" });
      } else {
        res.json(results);
      }
    }
  });
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

app.post("/producto/new", async (req, res) => {
  const { Id_Producto, Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos } = req.body;
  try {
    const result = await promisePool.query(`INSERT INTO producto VALUES ('${Id_Producto}','${Nombre}', '${Categoria}', '${Descripcion}', '${Precio}', '${Valoracion}', '${Ingredientes}', '${Costo}', '${Minutos}')`);
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

app.put("/producto/:id", async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
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
    values.push(id);

    const result = await promisePool.query(sql, values);
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

app.delete("/producto/:id", (req, res) => {
  const productId = req.params.id;
  console.log(req.params.id);
  connection.query('DELETE FROM producto WHERE Id_Producto = ?', [productId], (error, results) => {
    if (error) {
      res.status(500).json({ mensaje: "Error de base de datos" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ mensaje: "No existe el producto" });
      } else {
        res.json({ mensaje: "Registro eliminado con éxito" });
      }
    }
  });
});

module.exports = app;