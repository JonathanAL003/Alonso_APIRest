const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const opciones = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem"))
};

const app = express();

app.get('/', (req, res) => {
    res.send('Respuesta Segura');
});

https.createServer(opciones, app).listen(8080, function() {
    console.log("Servidor Express Seguro en puerto 8080");
});
