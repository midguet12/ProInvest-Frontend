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

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

const urlServidor = "http://localhost:3000/"

const verificarCodigoButton = document.getElementById("verificarCodigo");
const numeroVerificacionIngresado = document.getElementById("numeroVerificacion");
const mensajero = document.getElementById("mensajero");

async function myFunction(){
    if (correoElectronico.checkValidity() &&
        nombres.checkValidity() &&
        apellidoPaterno.checkValidity() &&
        apellidoMaterno.checkValidity() &&
        rfc.checkValidity() &&
        gradoAcademico.checkValidity() &&
        profesion.checkValidity() &&
        empresa.checkValidity() &&
        celular.checkValidity() 
    ) {
        const correoElectronico = correoElectronicoInput.value;

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

        if (respuesta.status == 201) {
            let respuestaJSON = await respuesta.json();

            console.log("Desplegando modal")
            
            let numeroVerificacionSistema = respuestaJSON.numeroVerificacion;
            modal.style.display = "block";

            verificarCodigoButton.onclick = function(){
                if (numeroVerificacionIngresado.value == numeroVerificacionSistema) {
                    console.log("Exitoso");
                    mensajero.style.color = "green"
                    mensajero.innerHTML = "Correo electronico verificado"
                    try {
                        window.localStorage.setItem("correoElectronico", correoElectronicoInput.value);
                        window.localStorage.setItem("nombres", nombres.value);
                        window.localStorage.setItem("apellidoPaterno", apellidoPaterno.value);
                        window.localStorage.setItem("apellidoMaterno", apellidoMaterno.value);
                        window.localStorage.setItem("rfc", rfc.value);
                        window.localStorage.setItem("fechaNacimiento", fechaNacimiento.value);
                        window.localStorage.setItem("gradoAcademico", gradoAcademico.value);
                        window.localStorage.setItem("profesion", profesion.value);
                        window.localStorage.setItem("empresa", empresa.value);
                        window.localStorage.setItem("celular", celular.value);
                    } catch (error) {
                        console.log(error)
                    }
                    

                    setTimeout(()=>{
                        window.location.href = "direccion.html"
                    },1000 * 2);

                } else {
                    console.log("No exitoso");
                    mensajero.style.color = "red"
                    mensajero.innerHTML = "Codigo incorrecto"
                }

            }
        }
    }
}

span.onclick = function() {
    modal.style.display = "none";
}

//const siguienteButton = document.getElementById("siguienteButton");
/*siguienteButton.addEventListener('click', (event) =>{
    event.preventDefault();
    if (correoElectronico.checkValidity() &&
        nombres.checkValidity() &&
        apellidoPaterno.checkValidity() &&
        apellidoMaterno.checkValidity() &&
        rfc.checkValidity() &&
        gradoAcademico.checkValidity() &&
        profesion.checkValidity() &&
        empresa.checkValidity() &&
        celular.checkValidity() 
    ) {
        console.log("funciona")
    }
});*/

/*siguienteButton.onclick = function(){


    
    window.localStorage.setItem("correoElectronico", correoElectronico.value);
    window.localStorage.setItem("nombres", nombres.value);
    window.localStorage.setItem("apellidoPaterno", apellidoPaterno.value);
    window.localStorage.setItem("apellidoMaterno", apellidoMaterno.value);
    window.localStorage.setItem("rfc", rfc.value);
    window.localStorage.setItem("fechaNacimiento", fechaNacimiento.value);
    window.localStorage.setItem("gradoAcademico", gradoAcademico.value);
    window.localStorage.setItem("profesion", profesion.value);
    window.localStorage.setItem("empresa", empresa.value);
    window.localStorage.celular("celular", celular.value);




}*/






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