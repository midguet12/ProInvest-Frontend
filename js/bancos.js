import {registrarBancos} from "./controllers/bancosController.js";
import {validar} from "./components/validador.js";
import {mostrarToast,mostrarError, manejarRespuesta} from "./components/manejadorMensajes.js";

addEventListener("submit", async () => {

    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarBancos({
        "nombre":nombre,
    });
    manejarRespuesta(respuesta);

});

(function () {
    validar();

})();