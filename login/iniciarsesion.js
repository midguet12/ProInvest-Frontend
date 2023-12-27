const correoElectronicoInput = document.getElementById('correoElectronicoInput');
const contrasenaInput = document.getElementById('contrasenaInput');
const iniciarSesionButton = document.getElementById("iniciarSesionButton");
const mensajeroP = document.getElementById('mensajero');

iniciarSesionButton.onclick = async function(){
    const contrasenaCifrada = await hash( correoElectronicoInput.value + contrasenaInput.value);

    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    let validacion = correoElectronicoInput.value.match(expresionRegular);

    if (validacion!= null) {
        iniciarSesion(correoElectronicoInput.value, contrasenaCifrada);
    } else {
        console.log("No es correo");
        correoElectronicoInput.style.borderColor = 'red';
        mensajeroP.innerHTML = "Por favor ingresa un correo valido";

        setTimeout(()=>{
            correoElectronicoInput.style.borderColor = 'black';
            mensajeroP.innerHTML = " ";
        },1000 * 2);
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

async function iniciarSesion(correoElectronico, contrasenaCifrada){

   



    const body = {
        correoElectronico,
        contrasena: contrasenaCifrada
    };

    const urlServidor = "http://localhost:3000/iniciarsesion";
    const respuesta = await fetch(urlServidor, {
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
        let redirectUrl = "profile/index.html";

        let respuestaJSON = await respuesta.json();

        let token = respuestaJSON.token;
        let correoElectronico = respuestaJSON.correoElectronico;

        if (token != null) {
            //window.localStorage.clear();
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("correoElectronico", correoElectronico);
            window.location.href = redirectUrl;

        } 
    } else if(respuesta.status == 404){
      console.log("Correo no existe");
      correoElectronicoInput.style.borderColor = 'red';
      mensajeroP.innerHTML = "Correo no se encuentra registrado";

        setTimeout(()=>{
            correoElectronicoInput.style.borderColor = 'black';
            mensajeroP.innerHTML = " ";
        },1000 * 2);
      
    } else if (respuesta.status == 401) {
        console.log("Contraseña incorrecta");
        contrasenaInput.style.borderColor = 'red';
        mensajeroP.innerHTML = "Contraseña incorrecta"

        setTimeout(()=>{
            contrasenaInput.style.borderColor = 'black';
            mensajeroP.innerHTML = " ";
        },1000 * 2);
    } else {
        console.log(`Error: ${respuesta.status}`);
    }

}
