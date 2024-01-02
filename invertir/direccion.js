const numeroExterior = document.getElementById("numeroExterior");
const numeroInterior = document.getElementById("numeroInterior");
const codigoPostal = document.getElementById("codigoPostal");
const colonia = document.getElementById("colonia");
const estado = document.getElementById("estado");
const municipio = document.getElementById("municipio");
const mensajero = document.getElementById("mensajero");

const urlServidor = "http://localhost:3000/"

async function myFunction(){
    

    if (validarEntradas()){

        //let correoElectronico = window.localStorage.getItem("correoElectronico");
        const correoElectronico = "midguet12@hotmail.com";
        
        let codigoRespuestaRegistroDireccion = await enviarDireccion(
            correoElectronico,
            numeroExterior.value,
            numeroInterior.value,
            codigoPostal.value,
            colonia.value,
            estado.value,
            municipio.value
        )

        if (codigoRespuestaRegistroDireccion == 201) {
            mensajero.style.color = "Green";
            mensajero.innerHTML = "Guardando datos de domicilio...";
            
            setTimeout(()=>{
                window.location.href = "bancaria.html";
            },1000 * 1);

        }
    }
}

function validarEntradas(){
    if (numeroExterior.checkValidity() &&
        numeroInterior.checkValidity() &&
        codigoPostal.checkValidity() &&
        colonia.checkValidity() &&
        estado.checkValidity() &&
        municipio.checkValidity() 
    ) {
        return true;
    } else {
        return false;
    }
}

async function enviarDireccion(
    correoElectronico,
    numeroExterior,
    numeroInterior,
    codigoPostal,
    colonia,
    estado,
    municipio
){

    const body = {
        correoElectronico,
        numeroExterior,
        numeroInterior,
        codigoPostal,
        colonia,
        estado,
        municipio
    };

    try {
        const respuesta = await fetch(urlServidor + 'solicitudinversion/direccion', {
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
        console.log("Error enviando direccion " + error);
    }
}

/*
    correoElectronico: direccion.correoElectronico,
    numeroExterior: direccion.numeroExterior,
    numeroInterior: direccion.numeroInterior,
    codigoPostal: direccion.codigoPostal,
    colonia: direccion.colonia,
    estado: direccion.estado,
    municipio: direccion.municipio
*/