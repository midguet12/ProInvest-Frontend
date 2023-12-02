import {obtenerConfiguracionSimulador,
        actualizarConfiguracionSimulador} from "./controllers/configuracionSimuladorController.js";
import {manejarRespuesta,mostrarError,mostrarToast} from "./components/manejadorMensajes.js";


const montoMinimo = document.getElementById("monto-minimo");
const montoMaximo = document.getElementById("monto-maximo");
const plazoMinimo = document.getElementById("plazo-minimo");
const plazoMaximo = document.getElementById("plazo-maximo");
const guardar = document.getElementById("guardar");


if (sessionStorage.key("exito") !== null){
    mostrarToast(sessionStorage.getItem("exito"));
    sessionStorage.removeItem("exito")
}

const respuesta = await obtenerConfiguracionSimulador();

function actualizarPlazos(){
    plazoMaximo.min = parseInt(plazoMinimo.value) + 1;
    plazoMinimo.max = parseInt(plazoMaximo.value) - 1;
}

function actualizarMontos(){
    montoMaximo.min = parseInt(montoMinimo.value) + 10000;
    montoMinimo.max = parseInt(montoMaximo.value) - 10000;
}

if (respuesta.ok){
    const configuracionSimuladorActual = await respuesta.json();
    plazoMinimo.disabled = false;
    plazoMaximo.disabled = false;
    montoMinimo.disabled = false;
    montoMaximo.disabled = false;
    guardar.disabled = false;
    plazoMinimo.value = configuracionSimuladorActual.plazoMinimo;
    plazoMaximo.value = configuracionSimuladorActual.plazoMaximo;
    montoMinimo.value = configuracionSimuladorActual.montoMinimo;
    montoMaximo.value = configuracionSimuladorActual.montoMaximo;
    actualizarPlazos();
    actualizarMontos();
}else{
    mostrarError("No hay conexión.");
}

addEventListener("submit", async() =>{

    const respuesta = await actualizarConfiguracionSimulador({
        plazoMinimo: plazoMinimo.value,
        plazoMaximo: plazoMaximo.value,
        montoMinimo: montoMinimo.value,
        montoMaximo: montoMaximo.value,
    })
    manejarRespuesta(respuesta);
    sessionStorage.setItem("exito","Registro exitoso.");

})

$("input[type='number']").inputSpinner({buttonsOnly: true });
plazoMinimo.addEventListener("change", (e) => {
    actualizarPlazos();
})

plazoMaximo.addEventListener("change", (e) => {
    actualizarPlazos()
})

montoMinimo.addEventListener("change", (e) => {
    actualizarMontos();
})

montoMaximo.addEventListener("change", (e) => {
    actualizarMontos();
})
