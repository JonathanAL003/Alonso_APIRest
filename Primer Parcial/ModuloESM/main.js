import { obtenerFrase } from "./index.js";

const btnModule = document.querySelector(".btnModule");
const fraseContainer = document.getElementById("fraseContainer"); 

btnModule.addEventListener('click', () => {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1;
    const frase = obtenerFrase(numeroAleatorio - 1);
    fraseContainer.textContent = `Frase obtenida: ${frase}`;
});
