let http = require('http');

let servidor = http.createServer(function(req, res) {
    res.setHeader("Acces-Control-Allow-Origin", "*");
    res.write('Servidor HTTP contestando');
    res.end();
});

servidor.listen(80,()=>{
    console.log("Servidor Node-HTTP escuchando en puerto 8080");
});