/**
 * Frases que se pueden obtener de manera random
 * @module alpaq
 */

/**
 * @function obtenerFrase
 * @param {number} indice - Índice para obtener una frase aleatoria.
 * @returns {string} - La frase obtenida.
 * @example
 * const alpaq = require('alpaq');
 * const frase = alpaq.obtenerFrase(2); // Obtiene la tercera frase del array.
 */

let frases = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
    // ... otras frases
  ];
  
  function obtenerFrase(indice) {
    return frases[indice];
  }
  
  // Exporta la función obtenerFrase como parte del módulo alpaq
  module.exports = { obtenerFrase };
  