import {registrarOrigenFondo, obtenerOrigenesDeFondos, actualizarOrigenFondo} from "./controllers/origenesFondosController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

const tablaCuerpo = document.getElementById("tablaCuerpo");
let origenesDeFondos = await (await obtenerOrigenesDeFondos()).json();
let actualizarButton = document.getElementById("actualizar")
const nombreActualizacion = document.getElementById("nombreActualizacion");

let selector;
let i = 1;
origenesDeFondos.forEach( item => {
    const botonEditar = document.createElement('button');
    botonEditar.classList.add("btn", "btn-primary");
    botonEditar.setAttribute("data-bs-toggle", "modal");
    botonEditar.setAttribute("data-bs-target", "#modalEdicion");

    //tituloModal.innerHTML = "Editar origen de fondo";
    //textoModal.innerHTML = "Ingrese los nuevos datos del origen de fondo";

    botonEditar.id = item.idOrigenFondo;
    botonEditar.innerHTML = "<i class=\"intangible fa-solid fa-pen\"></i>\n";
    //botonEditar.addEventListener("click", (e) => [funcion actualizar de midguet]));
    //botonEditar.addEventListener("click", (e) => actualizarOrigenFondo(i))
    botonEditar.addEventListener("click", async(e) =>{
        nombreActualizacion.value = item.nombre;
        selector = parseInt(botonEditar.id);
        

    });
    


    let fila = tablaCuerpo.insertRow();
    let numeroOrigenDeFondo = fila.insertCell(0)
    numeroOrigenDeFondo.innerHTML = item.idOrigenFondo;
    let nombre = fila.insertCell(1);
    nombre.innerHTML = item.nombre ;
    let editar = fila.insertCell(2);
    editar.appendChild(botonEditar);
})


addEventListener("submit", async (e) => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarOrigenFondo({
        "nombre":nombre,
    });

    manejarRespuesta(respuesta);
});

actualizarButton.addEventListener("click", async(e) =>{
    //console.log(selector)
    //console.log(nombre);
    const respuesta = await actualizarOrigenFondo({
        "idOrigenFondo": selector,
        "nombre": nombreActualizacion.value
    });

    manejarRespuesta(respuesta);
});


(function () {
    validar();
})();