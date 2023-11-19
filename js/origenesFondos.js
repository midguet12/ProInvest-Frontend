import {registrarOrigenFondo} from "./controllers/origenesFondosController.js";
import {validar} from "./validador.js";
import {manejar} from "./manejadorMensajes.js";

addEventListener("submit", async () => {
    const nombre = document.getElementById("nombre-nuevo-tipo").value;
    const respuesta = await registrarOrigenFondo({
        "nombre":nombre,
    });

    await manejar(respuesta);
});

(function () {
    validar();
})();