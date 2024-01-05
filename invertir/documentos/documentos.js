
const folioSolicitudInput = document.getElementById("folioSolicitud");
const curp = document.getElementById("curp");
const identificacionOficial = document.getElementById("identificacionOficial");
const documentos = document.getElementById("documentos");
const mensajero = document.getElementById("mensajero");


const urlServidor = "http://localhost:3000/";
const folioSolicitud = window.localStorage.getItem("folioSolicitud");
folioSolicitudInput.value = folioSolicitud;


async function myFunction(){
    if (validarEntradas()) {

        const codigoRespuesta = await cargarDocumentos(documentos);

        if (codigoRespuesta == 201) {
            mensajero.style.color = "green";
            mensajero.innerHTML = "Documentos cargados";
            setTimeout(()=>{
                window.location.href = "../resumen/index.html"
            },1000 * 2);

        } else if(codigoRespuesta == 400){
            mensajero.style.color = "red";
            mensajero.innerHTML = "El tamaño de alguno de los archivos es mayor de 5MB, prueba cargar uno de menor tamaño.";
            
        }

    }
    
}

function validarEntradas(){
    if (curp.checkValidity() && identificacionOficial.checkValidity()) {
        return true;
    } else {
        return false;
    }
}

async function cargarDocumentos(formulario, folioSolicitud){
    try {
        
        const formData = new FormData(formulario);
        
        const respuesta = await fetch(urlServidor+"solicitudinversion/cargardocumentos", {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: formData
        });

        return respuesta.status;
    } catch (error) {
        console.log(error);
    }
}
