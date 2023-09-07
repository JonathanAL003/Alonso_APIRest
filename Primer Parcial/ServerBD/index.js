const express = require('express');
const app = express();
const mysql = require('mysql2')


app.get("/alumnos", (req, res) => {
    res.json({respuesta : "Servidor Express contestando peticion POST"});
    })

app.post("/alumnos", (req, res) => {
res.send("Servidor Express contestando peticion POST");
})

app.listen(8080, () => {
console.log("servidor express escuchando en el puerto 8080");
})

var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
 
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdweb'
});

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



// app.get("/producto",(req,res)=>{
//   mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   .then(conn => conn.query('SELECT * from producto'))
//   .then(([rows, fields]) => res.json(rows));
// })

// app.get("/producto/:id",(req,res)=>{
//   console.log(req.params.id)
//   mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   .then(conn => conn.query('SELECT * from producto where Id_Producto='+req.params.id))
//   .then(([rows, fields]) => res.json(rows));
// })

// app.get("/productos",async (req,res)=>{
//   try{
//   const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   const [rows,fields] = await conn.query('SELECT * from producto');
//   res.json(rows);
//   } catch{
//     res.json({mensaje: "Error de conexion"});
//   }
//   });

// app.get("/productos/:id",async (req,res)=>{
//   console.log(requ.params.id);
//   const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   const [rows,fields] = await conn.query('SELECT * from producto where Id_Producto='+req.params.id)
//   if(rows.length==0){
//     res.json({mensaje: "No existe el producto"})
//   } else {
//     res.json(rows);
//   }
// });