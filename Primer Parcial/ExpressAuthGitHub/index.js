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
