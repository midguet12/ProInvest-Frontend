import {registrarTiposInversion} from "./controllers/tiposInversionController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

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