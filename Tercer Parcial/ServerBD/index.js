const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const swaggerJsDoc = require('swagger-jsdoc'); 
const swaggerUI = require('swagger-ui-express'); 
app.use(cors());
app.use(express.json());

const promisePool = require('./connection.js');

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.listen(8080, () => {
console.log("servidor express escuchando en el puerto 8080");
})

var fs = require('fs')
var morgan = require('morgan')
var path = require('path');
 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
app.use(morgan('combined', { stream: accessLogStream }))
 
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdweb'
});

const swaggerOptions = {
    definition: {
    openapi: '3.0.0',
    info: {
    title: 'API Productos',
    version: '1.0.0',
    },
    servers:[
    {url: "http://localhost:8080"}
    ],},
    apis: [`${path.join(__dirname,"./routes/ruta_producto.js")}`],
  };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.get("/producto", (req, res) => {
  connection.query('SELECT * FROM producto', (error, results) => {
      if (error) {
          res.status(500).json({ mensaje: "Error de base de datos" });
      } else {
          res.json(results);
      }
  });
});

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

    app.post("/producto/new", async (req, res) => {
        const {Id_Producto,Nombre,Categoria,Descripcion,Precio,Valoracion,Ingredientes,Costo,Minutos} = req.body;
      try {
        const result = await promisePool.query(`INSERT INTO producto VALUES ('${Id_Producto}','${Nombre}', '${Categoria}', '${Descripcion}', '${Precio}', '${Valoracion}', '${Ingredientes}', '${Costo}', '${Minutos}')`)
        res.json(result[0]).status(200);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

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
                    res.json({mensaje : "Registro eliminado con exito"});
                }
            }
        });
      });