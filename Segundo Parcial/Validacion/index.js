const express = require('express');
const {check, validationResult} = require('express-validator');
const app = express();
app.use(express.json());

// Manejador de ruta para procesar el formulario
app.post("/producto",
    [
    check('Id_Producto').isNumeric(),
    check('Precio').isDecimal(),
    check('Valoracion').isDecimal(),
    check('Costo').isDecimal(),
    check('Minutos').isDecimal()],
    (req, res) => {
    const result = validationResult(req);
    if(result.isEmpty()){
        console.log(req.body);
        res.json({mensaje: "Respuesta a peticion post"});
    }else{
        res.json(result);
    }
});

// Inicia el servidor
app.listen(8080, () => {
    console.log("Servidor Express escuchando en el puerto 8080");
  });