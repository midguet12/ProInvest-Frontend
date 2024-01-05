/*import {validar} from "js/components/validador.js";
import {manejarRespuesta} from "./components/manejadorMensajes.js";*/

const correoElectronicoP = document.getElementById("correoElectronico");
const nombresP = document.getElementById("nombreP");
const apellidosP = document.getElementById("apellidosP");
const fechaNacimientoP = document.getElementById("fecha-nacimiento");
const celularP = document.getElementById("celular");
const tituloH3 = document.getElementById("titulo");
const cerrarSesionButton = document.getElementById("cerrarSesionButton");

const correoElectronico = window.localStorage.getItem("correoElectronico");
const token = window.localStorage.getItem("token");

obtenerUsuario(correoElectronico, token);

async function obtenerUsuario(correoElectronico, token){
    const urlServidor = "http://localhost:3000/obtenergerente";
    const respuesta = await fetch(urlServidor, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin", 
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"

        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({correoElectronico})
    });
   
    const respuestaJSON = await respuesta.json();

    console.log(respuesta)

    tituloH3.innerHTML = "Bienvenido " + respuestaJSON.nombres;
    correoElectronicoP.innerHTML += " " + correoElectronico;
    nombresP.innerHTML += " " + respuestaJSON.nombres;
    apellidosP.innerHTML += " " + respuestaJSON.apellidoPaterno + " " + respuestaJSON.apellidoMaterno;
    fechaNacimientoP.innerHTML += " " + respuestaJSON.fechaNacimiento;
    celularP.innerHTML += " " + respuestaJSON.celular;
}

cerrarSesionButton.onclick = function(){
    console.log("como estas");
}

/*addEventListener("submit", async (event) => {
  
    const email = document.getElementById("nuevo-email").value;
    const contrasenia = document.getElementById("nuevo-contrasenia").value;
   /* const respuesta = await cambiarCredencialesGerente({
        "email": email,
        "contraseña": contrasenia,
    });

    manejarRespuesta(respuesta);
    console.log(email, contrasenia);
});

(function () {
    //validar();
})();*/

addEventListener("submit", async (event) => {
    const emailInput = document.getElementById("nuevo-email");
    const contraseniaInput = document.getElementById("nuevo-contrasenia");

    const email = emailInput.value;
    const contrasenia = contraseniaInput.value;

    const emailError = document.getElementById("email-error");
    const contraseniaError = document.getElementById("contrasenia-error");

    if (!validarEmail(email)) {
        emailError.innerHTML = "Ingrese un formato de correo electrónico válido.";
    } else {
       emailError.innerHTML = "";
    }

    if (!validarContrasenia(contrasenia)) {
        contraseniaError.innerHTML = "Ingrese una contraseña válida (mínimo 8 caracteres, 1 número, 1 letra y 1 símbolo).";
    } else {
        contraseniaError.innerHTML = "";
    }

    if (!validarEmail(email) || !validarContrasenia(contrasenia)) {
        event.preventDefault(); // Evita el envío del formulario si hay errores
        return;
    }

    // Resto del código (enviar solicitud al servidor, etc.)
});

function validarEmail(email) {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validarContrasenia(contrasenia) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(contrasenia);
}