const correoElectronicoP = document.getElementById("correoElectronico");
const nombresP = document.getElementById("nombreP");
const apellidosP = document.getElementById("apellidosP");
const fechaNacimientoP = document.getElementById("fecha-nacimiento");
const celularP = document.getElementById("celular");
const tituloH3 = document.getElementById("titulo");

//const correoElectronico = window.localStorage.getItem("correoElectronico");
const correoElectronico = "midguet12@hotmail.com";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW9FbGVjdHJvbmljb1Npc3RlbWEiOiJtaWRndWV0MTJAaG90bWFpbC5jb20iLCJjb250cmFzZW5hU2lzdGVtYSI6IjMzNWI5MDBmNTRlZjAyN2MzOTAzZDFmNWQ1M2YyMDUyMjA3YThiNDcxYTMzNzM3OWI2Njg5MDZiMjkyMjZkMmUiLCJleHAiOjE3MDM2NjA0MjYyOTYsImlhdCI6MTcwMzY1NjgyNn0.SnbSGOoRnav_e5_UJpTFBPcWOMgxrfMfutFIqpVHyO0";
//const token = window.localStorage.getItem("token");

obtenerUsuario(correoElectronico, token);




/*correoElectronicoP.innerHTML += " " + correoElectronico;
nombresP.innerHTML += " " + respuestaJSON.nombres;
apellidosP.innerHTML += " " + respuesta.apellidoPaterno + " " + respuesta.apellidoMaterno;*/


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