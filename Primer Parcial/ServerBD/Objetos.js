let objeto = {
    id: 1,
    Nombre: "Nugguets",
    Categoria: "Niños",
    Descripcion: "10 Nuggets de Pollo",
    Precio: 45.00,
    Valoracion: 4.5,
    Ingredientes: "Pollo, Pan Molido",
    Costo: 30.00,
    Minutos: 10
}


let campos= Object.keys(objeto);
let valores=Object.values(objeto);
let llaves=Object.entries(objeto);
console.log(campos);
console.log(valores);
console.log(llaves);

let sentenciasql="";
let cadenaUpdate = "update producto ";
let cadenaSet = "";
let cadenaWhere = " where"

campos.forEach(campos => {
    if (campo==id) {
        console.log(campo+`='` +objeto[campo]+`',`);
    } else{
        cadenaSet=cadenaSet+campo+`='`+objeto[campo]+`',`;
    }
});

console.log(cadenaSet);
cadenaSet = cadenaSet.substring(0,cadenaSet.length-1);
sentenciaSql= cadenaUpdate+cadenaSet+cadenaWhere;
console.log(sentenciaSql);