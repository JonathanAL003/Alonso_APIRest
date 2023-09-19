const events = require('events');

function cargar() {
    const emisor = new events.EventEmitter();
    setTimeout(()=>emisor.emit('load',' 25%'),2500);
    setTimeout(()=>emisor.emit('load',' 50%'),5000);
    setTimeout(()=>emisor.emit('load',' 75%'),7500);
    setTimeout(()=>emisor.emit('load',' 100%'),10000);
    return emisor;
}

let sal = cargar();

sal.on('load',(porc)=>{
    console.log('Cargando'+porc)
});