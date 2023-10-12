const express = require('express');
const cors = require('cors');
const productRoutes = require('./productRoutes'); // Importa el router de productos

const app = express();
app.use(cors());
app.use(express.json());

// Rutas para los productos (usando el router)
app.use('/productos', productRoutes);

// Ruta de inicio
app.get('/', function (req, res) {
    res.send('¡Hola, mundo!');
});

// Puerto en el que se ejecutará el servidor
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
