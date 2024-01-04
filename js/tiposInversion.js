import {obtenerTiposInversion, registrarTiposInversion} from "./controllers/tiposInversionController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

const tablaCuerpo = document.getElementById("tablaCuerpo");
let tiposInversion = await (await obtenerTiposInversion()).json();

let i = 0;
tiposInversion.forEach( item => {
    const botonEditar = document.createElement('button');
    botonEditar.classList.add("btn", "btn-primary");
    //botonEditar.setAttribute("data-bs-toggle", "modal");
    //botonEditar.setAttribute("data-bs-target", "#exampleModal");
    botonEditar.id = i;
    botonEditar.innerHTML = "<i class=\"intangible fa-solid fa-pen\"></i>\n";
    //botonEditar.addEventListener("click", (e) => [funcion actualizar de midguet]));

    let fila = tablaCuerpo.insertRow();
    let numeroTipoInversion = fila.insertCell(0)
    numeroTipoInversion.innerHTML = i++;
    let nombre = fila.insertCell(1);
    nombre.innerHTML = item.nombre ;
    let tasa = fila.insertCell(2);
    tasa.innerHTML = item.tasa;
    let editar = fila.insertCell(3);
    editar.appendChild(botonEditar);
})

addEventListener("submit", async () => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarTiposInversion({
        "nombre":nombre,
        "tasa": document.getElementById("tasa-nuevo-tipo").value,
    });

    manejarRespuesta(respuesta);
});

(function () {
    validar();
})();
