import {registrarOrigenFondo, obtenerOrigenesDeFondos} from "./controllers/origenesFondosController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

const tablaCuerpo = document.getElementById("tablaCuerpo");
let origenesDeFondos = await (await obtenerOrigenesDeFondos()).json();

let i = 0;
origenesDeFondos.forEach( item => {
    const botonEditar = document.createElement('button');
    botonEditar.classList.add("btn", "btn-primary");
    //botonEditar.setAttribute("data-bs-toggle", "modal");
    //botonEditar.setAttribute("data-bs-target", "#exampleModal");
    botonEditar.id = i;
    botonEditar.innerHTML = "<i class=\"intangible fa-solid fa-pen\"></i>\n";
    //botonEditar.addEventListener("click", (e) => [funcion actualizar de midguet]));

    let fila = tablaCuerpo.insertRow();
    let numeroOrigenDeFondo = fila.insertCell(0)
    numeroOrigenDeFondo.innerHTML = i++;
    let nombre = fila.insertCell(1);
    nombre.innerHTML = item.nombre ;
    let editar = fila.insertCell(2);
    editar.appendChild(botonEditar);
})


addEventListener("submit", async () => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarOrigenFondo({
        "nombre":nombre,
    });

    manejarRespuesta(respuesta);
});

(function () {
    validar();
})();