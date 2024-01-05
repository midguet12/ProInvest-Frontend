const origenFondos = document.getElementById("origenFondos");
const banco = document.getElementById("banco");
const cuenta = document.getElementById("cuenta");
const clabeInterbancaria = document.getElementById("clabeInterbancaria");

const urlServidor = "http://themaisonbleue.com:4500/"

const folioSolicitud = window.localStorage.getItem("folioSolicitud");

const mensajero = document.getElementById("mensajero");

async function myFunction(){
    if (validarEntradas()){
        try {
            /*window.localStorage.setItem("origenFondos", origenFondos.value);
            window.localStorage.setItem("banco", banco.value);
            window.localStorage.setItem("cuenta", cuenta.value);
            window.localStorage.setItem("clabeInterbancaria", clabeInterbancaria.value);*/

            let codigoRespuestaRegistroDatosBancarios = await enviarDatosBancarios(
                folioSolicitud,
                parseInt(origenFondos.value),
                parseInt(banco.value),
                cuenta.value,
                clabeInterbancaria.value
            )

            if (codigoRespuestaRegistroDatosBancarios == 201) {
                mensajero.style.color = "Green";
                mensajero.innerHTML = "Guardando datos bancarios...";

                setTimeout(()=>{
                    window.location.href = "../documentos/index.html";
                },1000 * 1);
            }

        } catch (error) {
            console.log(error)
        }
        
    }
}

function validarEntradas(){
    if (origenFondos.checkValidity() &&
        banco.checkValidity() &&
        cuenta.checkValidity() &&
        clabeInterbancaria.checkValidity()) 
    {
        return true;    
    } else {
        return false;
    }
}

async function enviarDatosBancarios(
    folioSolicitud,
    idOrigenFondo,
    idBanco,
    cuenta,
    clabe
){

    const body = {
        folioSolicitud,
        idOrigenFondo,
        idBanco,
        cuenta,
        clabe
    };

    try {
        const respuesta = await fetch(urlServidor + 'solicitudinversion/datosbancarios', {
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
        return respuesta.status;
    } catch (error) {
        console.log("Error enviando datos bancarios " + error);
    }
}