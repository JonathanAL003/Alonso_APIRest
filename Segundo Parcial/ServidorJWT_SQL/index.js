const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2'); // Importa el módulo mysql2

const opciones = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "cert.pem"))
};

const connection = mysql.createConnection({
    host: 'tu_host_de_mysql',
    user: 'tu_usuario',
    password: 'tu_contrasena',
    database: 'tu_base_de_datos'
});

const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Realiza la lógica de autenticación aquí (consulta a la base de datos, etc.)
    connection.query('SELECT * FROM usuarios WHERE username = ? AND password = ?', [username, password], (error, results) => {
        if (error) {
            res.status(500).json({ mensaje: 'Error de base de datos' });
        } else {
            if (results.length > 0) {
                // Autenticación exitosa
                res.json({ mensaje: 'Autenticación exitosa' });
            } else {
                // Usuario o contraseña incorrectos
                res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
            }
        }
    });
});

https.createServer(opciones, app).listen(8080, function() {
    console.log("Servidor Express Seguro en puerto 8080");
});
