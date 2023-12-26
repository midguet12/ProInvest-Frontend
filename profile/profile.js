const correoElectronicoP = document.getElementById("correoElectronico");
const nombresP = document.getElementById("nombreP");
const apellidosP = document.getElementById("apellidosP");
const rfcP = document.getElementById("rfc");
const fechaNacimientoP = document.getElementById("fecha-nacimiento");
const gradoAcademicoP = document.getElementById("grado-academico");
const profesionP = document.getElementById("profesion");
const empresaP = document.getElementById("empresa");
const celularP = document.getElementById("celular");
const cuentaP = document.getElementById("cuenta");
const clabeP = document.getElementById("clabe");

const correoElectronico = window.localStorage.getItem("correoElectronico");
const token = window.localStorage.getItem("token");

obtenerUsuario(correoElectronico, token);




/*correoElectronicoP.innerHTML += " " + correoElectronico;
nombresP.innerHTML += " " + respuestaJSON.nombres;
apellidosP.innerHTML += " " + respuesta.apellidoPaterno + " " + respuesta.apellidoMaterno;*/


async function obtenerUsuario(correoElectronico, token){
    const urlServidor = "http://localhost:3000/obtenerusuario";
    const respuesta = await fetch(urlServidor, {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({correoElectronico})
    });
   
    const respuestaJSON = await respuesta.json();
    
    console.log(respuestaJSON)

    correoElectronicoP.innerHTML += " " + correoElectronico;
    nombresP.innerHTML += " " + respuestaJSON.nombres;
    apellidosP.innerHTML += " " + respuestaJSON.apellidoPaterno + " " + respuestaJSON.apellidoMaterno;
    rfcP.innerHTML += " " + respuestaJSON.rfc;
    fechaNacimientoP.innerHTML += " " + respuestaJSON.fechaNacimiento;
    gradoAcademicoP.innerHTML += " " + respuestaJSON.gradoAcademico;
    profesionP.innerHTML += " " + respuestaJSON.profesion;
    empresaP.innerHTML += " " + respuestaJSON.empresa;
    celularP.innerHTML += " " + respuestaJSON.celular;
    cuentaP.innerHTML += " " + respuestaJSON.cuenta;
    clabeP.innerHTML += " " + respuestaJSON.clabe;
}