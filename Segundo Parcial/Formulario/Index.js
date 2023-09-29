const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const promisePool = require('./connection.js');
const cors = require('cors');
app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdweb'
});

// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Index.html');
});

// Manejador de ruta para procesar el formulario
app.post("/producto/new", async (req, res) => {

  const { Id_Producto, Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos } = req.body;
console.log(req.body)
  try {
    // Realiza la inserción en la base de datos
    const result = await promisePool.query(
      "INSERT INTO producto (Id_Producto,Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [Id_Producto, Nombre, Categoria, Descripcion, Precio, Valoracion, Ingredientes, Costo, Minutos]
    );
    res.sendFile(__dirname + '/Index.html');
    // Envía una respuesta exitosa
    res.status(200).send('Datos del producto insertados con éxito');
  } catch (error) {
    // Maneja los errores
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Inicia el servidor
app.listen(8080, () => {
  console.log("Servidor Express escuchando en el puerto 8080");
});