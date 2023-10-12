const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    
    res.send("Lista de productos");
});

router.post("/", (req, res) => {
    res.send("Crear un nuevo producto");
});

router.put("/:id", (req, res) => {
    const productId = req.params.id;
    res.send(`Actualizar el producto con ID ${productId}`);
});

router.delete("/:id", (req, res) => {
    const productId = req.params.id;
    res.send(`Eliminar el producto con ID ${productId}`);
});

module.exports = router;
