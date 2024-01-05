const correoElectronicoInput = document.getElementById("correoElectronico");
const nombres = document.getElementById("nombres");
const apellidoPaterno = document.getElementById("apellidoPaterno");
const apellidoMaterno = document.getElementById("apellidoMaterno");
const rfc = document.getElementById("rfc");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const gradoAcademico = document.getElementById("gradoAcademico");
const profesion = document.getElementById("profesion");
const empresa = document.getElementById("empresa");
const celular = document.getElementById("celular");


const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

const urlServidor = "http://localhost:3000/"

const verificarCodigoButton = document.getElementById("verificarCodigo");
const numeroVerificacionIngresado = document.getElementById("numeroVerificacion");
const mensajero = document.getElementById("mensajero");

async function myFunction(){
    if (validarEntradas()) {
        const correoElectronico = correoElectronicoInput.value;

        const respuesta = await enviarCorreoConfirmacion(correoElectronico);

        if (respuesta.status == 201) {
            modal.style.display = "block";
            const respuestaJSON = await respuesta.json();

            console.log("Desplegando modal")
            
            const numeroVerificacionSistema = respuestaJSON.numeroVerificacion;
            
            verificarCodigoButton.onclick = async function(){
                if (numeroVerificacionIngresado.value == numeroVerificacionSistema) {
                    console.log("Exitoso");
                    mensajero.style.color = "green"
                    mensajero.innerHTML = "Correo electronico verificado"
                    
                    const respuestaRegistroDatos = await enviarDatosPersonales(
                        correoElectronicoInput.value,
                        nombres.value,
                        apellidoPaterno.value,
                        apellidoMaterno.value,
                        rfc.value,
                        fechaNacimiento.value,
                        gradoAcademico.value,
                        profesion.value,
                        empresa.value,
                        celular.value
                    );

                    console.log(respuestaRegistroDatos.status);
                    
                    
                    if (respuestaRegistroDatos.status == 201) {
                        const respuestaJSON = await respuestaRegistroDatos.json();
                        window.localStorage.setItem("correoElectronico", respuestaJSON.correoElectronico);
                        window.localStorage.setItem("folioSolicitud", respuestaJSON.folioSolicitud);
                        setTimeout(()=>{
                            window.location.href = "../direccion/index.html"
                        },1000 * 2);
                    }

                } else {
                    console.log("No exitoso");
                    mensajero.style.color = "red"
                    mensajero.innerHTML = "Codigo incorrecto"
                }

            }
        }
    }
}

function validarEntradas(){
    if (correoElectronico.checkValidity() &&
        nombres.checkValidity() &&
        apellidoPaterno.checkValidity() &&
        apellidoMaterno.checkValidity() &&
        rfc.checkValidity() &&
        gradoAcademico.checkValidity() &&
        profesion.checkValidity() &&
        empresa.checkValidity() &&
        celular.checkValidity()) 
    {
        return true;    
    } else {
        return false;
    }
}


async function enviarCorreoConfirmacion(correoElectronico){
    const body = {
        correoElectronico
    };

    const respuesta = await fetch(urlServidor+"enviarcorreoconfirmacion", {
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

    console.log(respuesta.status);
    return respuesta;
}

async function enviarDatosPersonales(
    correoElectronico,
    nombres,
    apellidoPaterno,
    apellidoMaterno,
    rfc,
    fechaNacimiento,
    gradoAcademico,
    profesion,
    empresa,
    celular
){

    const body = {
        correoElectronico,
        nombres,
        apellidoPaterno,
        apellidoMaterno,
        rfc,
        fechaNacimiento,
        gradoAcademico,
        profesion,
        empresa,
        celular
    };

    try {
        const respuesta = await fetch(urlServidor + 'solicitudinversion/datospersonales', {
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

        console.log(respuesta.status);
        return respuesta;
    } catch (error) {
        console.log("Error enviando datos personales " + error);
    }
}

span.onclick = function() {
    modal.style.display = "none";
}



/*
"inversionista":{
        "correoElectronico": "midguet12@hotmail.com",
        "nombres": "Midguet Arturo",
        "apellidoPaterno": "Garcia",
        "apellidoMaterno": "Torres",
        "rfc": "GATM980822D48",
        "fechaNacimiento": "1998-08-22",
        "gradoAcademico": "Bachillerato",
        "profesion": "Estudiante",
        "empresa": "Universidad Veracruzana",
        "celular": "+529982935090"
*/