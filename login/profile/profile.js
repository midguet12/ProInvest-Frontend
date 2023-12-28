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