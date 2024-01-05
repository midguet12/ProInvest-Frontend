//datos personales
//const folioSolicitud = window.localStorage.getItem("folioSolicitud");
//const folioSolicitud = 1;
const correoElectronico = document.getElementById("correoElectronico");
const nombres = document.getElementById("nombres");
const apellidoPaterno = document.getElementById("apellidoPaterno");
const apellidoMaterno = document.getElementById("apellidoMaterno");
const rfc = document.getElementById("rfc");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const gradoAcademico = document.getElementById("gradoAcademico");
const profesion = document.getElementById("profesion");
const empresa = document.getElementById("empresa");
const celular = document.getElementById("celular");

//direccion
const numeroExterior = document.getElementById("numeroExterior");
const numeroInterior = document.getElementById("numeroInterior");
const codigoPostal = document.getElementById("codigoPostal");
const colonia = document.getElementById("colonia");
const estado = document.getElementById("estado");
const municipio = document.getElementById("municipio");

//informacion bancaria
const origenFondo = document.getElementById("origenFondo");
const banco = document.getElementById("banco");
const cuenta = document.getElementById("cuenta");
const clabe = document.getElementById("clabeInterbancaria");

//Documentos
const enlaceCurp = document.getElementById("enlaceCurp");
const enlaceIdentificacionOficial = document.getElementById("enlaceIdenficacionOficial");

const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

let queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const folioSolicitud = urlParams.get('foliosolicitud');
//console.log(variable)
console.log(folioSolicitud);

const urlServidor = "http://themaisonbleue.com:4500/";

llenarInformacion();


async function llenarInformacion(){
    const respuesta = await obtenerDatosResumen(folioSolicitud);
    const respuestaJSON = await respuesta.json();
    const inversionista = respuestaJSON.inversionista;
    const direccion = respuestaJSON.direccion;
    const datosBancarios = respuestaJSON.datosBancarios;
    const documentos = respuestaJSON.documentos;

    //datos personales
    correoElectronico.innerHTML = inversionista.correoElectronico;
    nombres.innerHTML = inversionista.nombres;
    apellidoPaterno.innerHTML = inversionista.apellidoPaterno;
    apellidoMaterno.innerHTML = inversionista.apellidoMaterno;
    rfc.innerHTML = inversionista.rfc;

    //const fechaNacimientoConvertida = new Date(inversionista.fechaNacimiento);

    //fechaNacimiento.innerHTML = fechaNacimientoConvertida.toLocaleDateString("es-ES");
    fechaNacimiento.innerHTML = inversionista.fechaNacimiento;
    gradoAcademico.innerHTML = inversionista.gradoAcademico;
    profesion.innerHTML = inversionista.profesion;
    empresa.innerHTML = inversionista.empresa;
    celular.innerHTML = inversionista.celular;

    //direccion
    numeroExterior.innerHTML = direccion.numeroExterior;
    numeroInterior.innerHTML = direccion.numeroInterior;
    codigoPostal.innerHTML = direccion.codigoPostal;
    colonia.innerHTML = direccion.colonia;
    estado.innerHTML = direccion.estado;
    municipio.innerHTML = direccion.municipio;

    cuenta.innerHTML = datosBancarios.cuenta;
    clabe.innerHTML = datosBancarios.clabe;

    enlaceCurp.href = urlServidor + "documento/" + folioSolicitud + "_curp.pdf";
    enlaceIdentificacionOficial.href = urlServidor + "documento/" + folioSolicitud + "_identificacionOficial.pdf";

}

function myFunction(){
    modal.style.display = "block";
}



async function obtenerDatosResumen(folioSolicitud){
    const body = {
        folioSolicitud: `${folioSolicitud}`
    };

    const respuesta = await fetch(urlServidor+"solicitudinversion/resumen", {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow", 
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(body)
    });

    
    return respuesta;
}

span.onclick = function() {
    modal.style.display = "none";
}