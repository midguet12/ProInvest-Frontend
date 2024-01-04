import {registrarBancos,obtenerBancos, actualizarBancos} from "./controllers/bancosController.js";
import {validar} from "./components/validador.js";
import {mostrarToast,mostrarError, manejarRespuesta} from "./components/manejadorMensajes.js";

const nombreNuevoBanco = document.getElementById("nombre-nuevo-banco");
const modalLabel = document.getElementById("modal-label");
const modalInstrucciones = document.getElementById("modal-instrucciones");
const modalForm = document.getElementById("modal-form");
const tablaCuerpo = document.getElementById("tablaCuerpo");
let bancos = await (await obtenerBancos()).json();
let idBancoSeleccionado = 0;

// Código para popular la tabla de ejemplo: --alejandro
// let i = 0;
// bancos.forEach( item => {
//     const botonEditar = document.createElement('button');
//     botonEditar.classList.add("btn", "btn-primary");
//     botonEditar.setAttribute("data-bs-toggle", "modal");
//     botonEditar.setAttribute("data-bs-target", "#exampleModal");
//     botonEditar.id = i;
//     botonEditar.innerHTML = "<i class=\"intangible fa-solid fa-pen\"></i>\n";
//     botonEditar.addEventListener("click", (e) => prepararFormularioActualizar(bancos[e.target.id]));
//
//     let fila = tablaCuerpo.insertRow();
//     let columna = fila.insertCell(0)
//     columna.innerHTML = i++;
//     let nombre = fila.insertCell(1);
//     nombre.innerHTML = item.nombre ;
//     let editar = fila.insertCell(2);
//     editar.appendChild(botonEditar);
// })
function prepararFormularioActualizar(bancoSeleccionado){
    idBancoSeleccionado = bancoSeleccionado.idBanco;
    modalForm.setAttribute("method", "PUT")
    modalLabel.innerText = "Actualizar banco";
    modalInstrucciones.innerText = "Ingrese los nuevos datos del Banco seleccionado"
    nombreNuevoBanco.value = bancoSeleccionado.nombre
}
$('#exampleModal').on('hidden.bs.modal', function () {
    modalLabel.innerText = "Nuevo banco";
    modalInstrucciones.innerText = "Ingrese los datos del nuevo Banco"
    modalForm.setAttribute("method", "POST")
    nombreNuevoBanco.value = "";
})

addEventListener("submit", async () => {
    const nombre = nombreNuevoBanco.value;
    let respuesta;
    const banco = {
        "idBanco": idBancoSeleccionado,
        "nombre": nombreNuevoBanco.value,
    }
    if (modalForm.getAttribute("method") === "POST") {
        respuesta = await registrarBancos(banco);
    } else {
        respuesta = await actualizarBancos(banco);
    }
    manejarRespuesta(respuesta);
});

(function () {
    validar();
    //test
})();