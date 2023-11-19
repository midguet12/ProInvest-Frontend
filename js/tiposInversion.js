const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

import {registrarTiposInversion} from "./controllers/tiposInversionController.js";
import {validar} from "./validador.js";

addEventListener("DOMContentLoaded", () =>{
    if (localStorage.getItem("error") !== null){
        document.getElementById("modal-error-mensaje").innerHTML = (localStorage.getItem("error"));
        $("#modal-error").modal("show");
        localStorage.removeItem("error")
    } else if (localStorage.getItem("exito") !== null) {
        document.getElementById("toast-mensaje").innerHTML = (localStorage.getItem("exito"));
        const toast = new bootstrap.Toast(document.getElementById("toast"));
        toast.show();
        localStorage.removeItem("exito")
    }
})

addEventListener("submit", async () => {

    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const response = await registrarTiposInversion({
        "nombre":nombre,
        "tasa": document.getElementById("tasa-nuevo-tipo").value,
    });

    const r = await response.json()
    if (response.status !== 201){
        localStorage.setItem("error", `${r.errors[0].message} (${r.errors[0].value})`)
    }else{
        localStorage.setItem("exito", `${r.nombre} registrado exitosamente.`)
    }
});

(function () {
    validar();
})();

// document.getElementById("asdf").addEventListener("click", () => {
//     $("#modal-error").modal("show")
// })