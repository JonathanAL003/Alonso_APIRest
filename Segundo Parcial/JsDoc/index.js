/**
 * Frases que se pueden obtener de manera random
 */
let frases=[
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
    "El único modo de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
    "El camino hacia el éxito yace en no temerle al fracaso. - Winston Churchill",
    "El fracaso es una oportunidad para empezar de nuevo, pero de forma más inteligente. - Henry Ford",
    "No importa lo lento que vayas, siempre y cuando no te detengas. - Confucio"
]

/**
 * Esta funcion es la encargada de regresar una frase. 
 * @param {Number} indice Se requiere de este numero para poder calcular de manera random, la frase que se regresera.
 * @returns 
 */
function obtenerFrase(indice){
    return frases(indice);
}

/**
 * Export del Modulo
 */
module.exports.obtenerFrase=obtenerFrase;


/**Confirmacion de funcionamento en consola. */
console.log(module);
