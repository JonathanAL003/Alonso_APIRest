/**
 * Módulo para obtener frases aleatorias usando el módulo `alpaq`.
 * @module Tutorial
 */

/**
 * @function obtenerFrase
 * @param {number} indice - Índice para obtener una frase aleatoria.
 * @returns {string} - La frase obtenida.
 * @throws {Error} Si el índice no es un número entero.
 * @example
 * const alpaq = require('alpaq');
 * const frase = alpaq.obtenerFrase(2); // Obtiene la tercera frase del conjunto.
 */

// Importa el módulo alpaq
const alpaq = require('alpaq');

/**
 * Función principal para obtener y mostrar una frase aleatoria usando `alpaq`.
 * @function obtenerYMostrarFraseAleatoria
 * @param {number} indice - Índice para obtener una frase aleatoria.
 */
function obtenerYMostrarFraseAleatoria(indice) {
  try {
    // Obtiene una frase aleatoria usando el índice proporcionado
    const frase = alpaq.obtenerFrase(indice);
    // Imprime la frase obtenida
    console.log(frase);
  } catch (error) {
    // Captura y maneja cualquier error que ocurra durante la obtención de la frase
    console.error(error.message);
  }
}

// Ejemplo de uso de la función para obtener y mostrar una frase aleatoria en el índice 2
obtenerYMostrarFraseAleatoria(2);
