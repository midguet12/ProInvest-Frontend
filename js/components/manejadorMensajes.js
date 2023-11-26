addEventListener("DOMContentLoaded", () =>{
    if (sessionStorage.getItem("exito") !== null){
        mostrarToast(sessionStorage.getItem("exito"))
        sessionStorage.removeItem("exito")
    }else if (sessionStorage.getItem("error") !== null){
        mostrarError(sessionStorage.getItem("error"))
        sessionStorage.removeItem("error")
    }
})

export async function manejarRespuesta(respuesta){
    const json = await respuesta.json();
    if (respuesta.ok){
        sessionStorage.setItem("exito", `${json.mensaje}`)
    }else{
        sessionStorage.setItem("error", `${json.mensaje}`)
    }
}

export async function mostrarError(mensaje){
    const modalErrorNuevo = document.createElement('div');

    modalErrorNuevo.innerHTML =
    "<div class=\"modal fade\"  data-bs-backdrop=\"static\"  id=\"modal-error\" tabindex=\"-1\" aria-labelledby=\"modal-error-titulo\" aria-hidden=\"true\">\n" +
    "    <div class=\"modal-dialog modal-dialog-centered\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header alert alert-danger\">\n" +
    "                <h5 class=\"modal-title\" id=\"modal-error-titulo\"><i class=\"fa-solid fa-triangle-exclamation\"></i> Error</h5>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <p id=\"modal-error-mensaje\"></p>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <button type=\"button\" class=\"btn btn-primary\" data-bs-dismiss=\"modal\">Aceptar</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>";

    if (document.getElementById("modal-error") === null){
        document.body.appendChild(modalErrorNuevo);
    }

    document.getElementById("modal-error-mensaje").innerHTML = mensaje;
    $("#modal-error").modal("show");
}

export async function mostrarToast(mensaje){
    const toastNuevo = document.createElement('div');

    toastNuevo.innerHTML = "<div class=\"toast-container position-fixed bottom-0 end-0 p-3\">\n" +
        "    <div id=\"toast\" class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\">\n" +
        "        <div class=\"toast-header\">\n" +
        "            <i class=\"fa-solid fa-circle-check\"></i>\n" +
        "            <strong class=\"me-auto\" id=\"toast-mensaje\">CETES agregado exitosamente.</strong>\n" +
        "            <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "</div>"

    if (document.getElementById("toast") === null){
        document.body.appendChild(toastNuevo);
    }

    document.getElementById("toast-mensaje").innerHTML = mensaje;
    const toast = new bootstrap.Toast(document.getElementById("toast"));
    toast.show();
}

