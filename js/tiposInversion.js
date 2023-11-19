import {registrarTiposInversion} from "./controllers/tiposInversionController.js";
import {validar} from "./validador.js";
import {manejar} from "./manejadorMensajes.js";

addEventListener("submit", async () => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarTiposInversion({
        "nombre":nombre,
        "tasa": document.getElementById("tasa-nuevo-tipo").value,
    });

    await manejar(respuesta);
});

(function () {
    validar();
})();

// document.getElementById("asdf").addEventListener("click", () => {
//     $("#modal-error").modal("show")
// })