import {registrarBancos} from "./controllers/bancosController.js";
import {validar} from "./validador.js";
import {manejar} from "./manejadorMensajes.js";

addEventListener("submit", async () => {

    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarBancos({
        "nombre":nombre,
    });
    await manejar(respuesta);
});

(function () {
    validar();
})();