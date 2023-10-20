const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const opciones = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'cert.pem'))
};

const app = express();

app.use(express.json());

// Ruta para generar tokens JWT después de verificar las credenciales
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '1234') {
        // Crea un token JWT con un payload
        const payload = { username: username };
        const token = jwt.sign(payload, '5669', { expiresIn: '1h' });

        // Envía el token JWT como respuesta
        res.json({ token: token });
    } else {
        res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
});

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const token = req.header('Authorization');

    // Verifica si hay un token
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
    }

    // Verifica el token
    jwt.verify(token, 'secreto', (error, usuario) => {
        if (error) {
            return res.status(403).json({ mensaje: 'Token inválido.' });
        }
        req.usuario = usuario;
        next();
    });
}

app.get('/recurso-protegido', verificarToken, (req, res) => {
    res.json({ mensaje: `Bienvenido, ${req.usuario.username}! Este es un recurso protegido.` });
});

https.createServer(opciones, app).listen(8080, function() {
    console.log('Servidor Express Seguro en puerto 8080');
});