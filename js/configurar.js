import {obtenerConfiguracionSimulador,
        reestablecerValores,
        actualizarConfiguracionSimulador} from "./controllers/configuracionSimuladorController.js";

const montoMinimo = document.getElementById("monto-minimo");
const montoMaximo = document.getElementById("monto-maximo");
const plazoMinimo = document.getElementById("plazo-minimo");
const plazoMaximo = document.getElementById("plazo-maximo");

const configuracionSimuladorActual = await obtenerConfiguracionSimulador();

plazoMinimo.value = configuracionSimuladorActual.plazoMinimo;
plazoMaximo.value = configuracionSimuladorActual.plazoMaximo;
montoMinimo.value = configuracionSimuladorActual.montoMinimo;
montoMaximo.value = configuracionSimuladorActual.montoMaximo;

document.getElementById("reestablecer").addEventListener("click", (e) =>{
    reestablecerValores();
})

addEventListener("submit", () =>{

    actualizarConfiguracionSimulador({

            plazoMinimo: plazoMinimo.value,
            plazoMaximo: plazoMaximo.value,
            montoMinimo: montoMinimo.value,
            montoMaximo: montoMaximo.value,

    });


})
