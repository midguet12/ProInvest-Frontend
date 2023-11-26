import {obtenerConfiguracionSimulador,
        reestablecerValores,
        actualizarConfiguracionSimulador} from "./controllers/configuracionSimuladorController.js";
import {mostrarError,mostrarToast} from "./components/manejadorMensajes.js";

const montoMinimo = document.getElementById("monto-minimo");
const montoMaximo = document.getElementById("monto-maximo");
const plazoMinimo = document.getElementById("plazo-minimo");
const plazoMaximo = document.getElementById("plazo-maximo");
const guardar = document.getElementById("guardar");
const reestablecer = document.getElementById("reestablecer");

if (sessionStorage.key("exito") !== null){
    mostrarToast(sessionStorage.getItem("exito"));
    sessionStorage.removeItem("exito")
}

const respuesta = await obtenerConfiguracionSimulador();
if (respuesta.ok){
    const configuracionSimuladorActual = await respuesta.json();
    plazoMinimo.disabled = false;
    plazoMaximo.disabled = false;
    montoMinimo.disabled = false;
    montoMaximo.disabled = false;
    guardar.disabled = false;
    reestablecer.disabled = false;
    plazoMinimo.value = configuracionSimuladorActual.plazoMinimo;
    plazoMaximo.value = configuracionSimuladorActual.plazoMaximo;
    montoMinimo.value = configuracionSimuladorActual.montoMinimo;
    montoMaximo.value = configuracionSimuladorActual.montoMaximo;
}else{
    mostrarError("No hay conexión.");
}


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
    sessionStorage.setItem("exito","Registro exitoso.");

})
