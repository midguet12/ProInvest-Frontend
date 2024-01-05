import {obtenerTiposInversion, registrarTiposInversion, actualizarTiposInversion} from "./controllers/tiposInversionController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

const tablaCuerpo = document.getElementById("tablaCuerpo");
let tiposInversion = await (await obtenerTiposInversion()).json();

let actualizarButton = document.getElementById("actualizar")
const nombreActualizacion = document.getElementById("nombreActualizacion");
const tasaActualizacion = document.getElementById("tasaActualizacion");

let selector;
let i = 0;
tiposInversion.forEach( item => {
    const botonEditar = document.createElement('button');
    botonEditar.classList.add("btn", "btn-primary");
    botonEditar.setAttribute("data-bs-toggle", "modal");
    botonEditar.setAttribute("data-bs-target", "#modalEdicion");
    botonEditar.id = item.idTipoInversion;
    botonEditar.innerHTML = "<i class=\"intangible fa-solid fa-pen\"></i>\n";
    //botonEditar.addEventListener("click", (e) => [funcion actualizar de midguet]));
    botonEditar.addEventListener("click", async(e) =>{
        nombreActualizacion.value = item.nombre;
        tasaActualizacion. value = item.tasa;

        selector = parseInt(botonEditar.id);
    });


    let fila = tablaCuerpo.insertRow();
    let numeroTipoInversion = fila.insertCell(0)
    numeroTipoInversion.innerHTML = item.idTipoInversion;
    let nombre = fila.insertCell(1);
    nombre.innerHTML = item.nombre ;
    let tasa = fila.insertCell(2);
    tasa.innerHTML = item.tasa;
    let editar = fila.insertCell(3);
    editar.appendChild(botonEditar);
})

addEventListener("submit", async (e) => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const tasa = parseFloat(document.getElementById("tasa-nuevo-tipo").value);
    const respuesta = await registrarTiposInversion({
        "nombre":nombre,
        //"tasa": 0.15
        "tasa": document.getElementById("tasa-nuevo-tipo").value,
    });

    manejarRespuesta(respuesta);
});

actualizarButton.addEventListener("click", async(e) =>{
    const respuesta = await actualizarTiposInversion({
        "idTipoInversion": selector,
        "nombre": nombreActualizacion.value,
        "tasa": tasaActualizacion.value
    });

    manejarRespuesta(respuesta);
});


(function () {
    validar();
})();
