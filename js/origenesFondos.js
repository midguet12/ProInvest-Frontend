import {registrarOrigenFondo} from "./controllers/origenesFondosController.js";
import {validar} from "./components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";

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