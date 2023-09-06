const express = require('express');
const app = express();
// app.use(express. json());

// app.get("/alumnos/:carrera", (req, res) => {
//     console.log(req.params);
//     console.log(req.query);
//     console.log(req.body);
//     res.send("Servidor Express contestando peticion GET");
// })

app.get("/alumnos", (req, res) => {
    res.json({respuesta : "Servidor Express contestando peticion POST"});
    })

app.post("/alumnos", (req, res) => {
res.send("Servidor Express contestando peticion POST");
})

app.listen(8080, () => {
console.log("servidor express escuchando en el puerto 8080");
})


var express = require('express')
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