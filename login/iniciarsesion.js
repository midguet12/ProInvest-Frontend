const correoElectronicoInput = document.getElementById('correoElectronicoInput');
const contrasenaInput = document.getElementById('contrasenaInput');
const iniciarSesionButton = document.getElementById("iniciarSesionButton");
const mensajeroP = document.getElementById('mensajero');

let prueba;

//window.localStorage.setItem("key", "token");


iniciarSesionButton.onclick = async function(){
    const contrasenaCifrada = await hash( correoElectronicoInput.value + contrasenaInput.value);

    iniciarSesion(correoElectronicoInput.value, contrasenaCifrada);

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

function iniciarSesion(correoElectronico, contrasenaCifrada){
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/iniciarsesion");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.status == 201 &&  xhr.readyState == 4) {  
            let redirectUrl = "profile/index.html";

            let responseJSON = JSON.parse(xhr.responseText);
            let token = responseJSON.token;
            let correoElectronico = responseJSON.correoElectronico;

            if (token != null) {
                //window.localStorage.clear();
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("correoElectronico", correoElectronico);
                window.location.href = redirectUrl;

            } 
        } else if(xhr.status == 404 && xhr.readyState == 4){
          console.log("Correo no existe");
          correoElectronicoInput.style.borderColor = 'red';
          mensajeroP.innerHTML = "Correo no se encuentra registrado";

            setTimeout(()=>{
                correoElectronicoInput.style.borderColor = 'black';
                mensajeroP.innerHTML = " ";
            },1000 * 2);
          
        } else if (xhr.status == 401 && xhr.readyState == 4) {
            console.log("Contraseña incorrecta");
            contrasenaInput.style.borderColor = 'red';
            mensajeroP.innerHTML = "Contraseña incorrecta"

            setTimeout(()=>{
                contrasenaInput.style.borderColor = 'black';
                mensajeroP.innerHTML = " ";
            },1000 * 2);
        } else {
            console.log(`Error: ${xhr.status}`);
        }
    };

    const body = JSON.stringify({
        correoElectronico: correoElectronico,
        contrasena: contrasenaCifrada
    });

    xhr.send(body);
}
