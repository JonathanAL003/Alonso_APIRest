const express = require('express');
const app = express();


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

// app.get("/productos",(req,res)=>{
//   mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   .then(conn => conn.query('SELECT * from productos'))
//   .then(([rows, fields]) => res.json(rows));
// })

// app.get("/productos/:id",(req,res)=>{
//   console.log(req.params.id)
//   mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
//   .then(conn => conn.query('SELECT * from producto where Id_Producto='+req.params.id))
//   .then(([rows, fields]) => res.json(rows));

// })

app.get("/productos",async (req,res)=>{
  try{
  const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
  const [rows,fields] = await conn.query('SELECT * from producto');
  res.json(rows);
  } catch{
    res.json({mensaje: "Error de conexion"});
  }
  });

app.get("/productos/:id",async (req,res)=>{
  console.log(requ.params.id);
  const conn = await mysql.createConnection({host:'localhost',user:'root',password:'',database:'bdweb'})
  const [rows,fields] = await conn.query('SELECT * from producto where Id_Producto='+req.params.id)
  if(rows.length==0){
    res.json({mensaje: "No existe el producto"})
  } else {
    res.json(rows);
  }
});