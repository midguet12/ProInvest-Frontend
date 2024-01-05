const enviarCambiosButton = document.getElementById("enviarButton");
const emailError = document.getElementById("email-error");
const contraseniaError = document.getElementById("contrasenia-error");
const emailInput = document.getElementById("nuevo-email");
const contraseniaInput = document.getElementById("nuevo-contrasenia");
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


enviarCambiosButton.onclick = async function(){
    let validacionEmail = validarEmail(emailInput.value, false);
    let validacionContrasenia = validarContrasenia(contraseniaInput.value, false);
    if (validacionContrasenia && validacionEmail) {
        const contrasenaCifrada = await hash(contraseniaInput.value);

        //ENVIAR CAMBIOS A LA bd

    }
}

async function hash(input){
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, "0"))
        .join("");
    return hash;
}

function validarEmail(email, validacionEmail) {
    const regex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    validacionEmail = regex.test(email);
    if (!validacionEmail) {
        emailInput.style.borderColor = 'red';
        emailError.innerHTML = "El correo ingresado no es valido";
        desaparecerMensajes(emailInput, emailError);
    } 
   
    return validacionEmail;
}

function validarContrasenia(contrasenia, validacionContrasenia) {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()-_+=])(?=.*[a-zA-Z]).{8,}$/;
    validacionContrasenia = regex.test(contrasenia);
    if (!validacionContrasenia) {
        contraseniaInput.style.borderColor = 'red';
        contraseniaError.innerHTML = "La contraseña debe tener al menos 8 caracteres, un número, un símbolo y una letra";
        desaparecerMensajes(contraseniaInput, contraseniaError);
    } 
    return validacionContrasenia;
}

function desaparecerMensajes(elementoInvalido, elementoMensaje) {
    setTimeout(()=>{
        elementoInvalido.style.borderColor = 'black';
        elementoMensaje.innerHTML = " ";
    },1000 * 3);
}
