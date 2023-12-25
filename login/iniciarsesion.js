const correoElectronicoInput = document.getElementById('correoElectronicoInput');
const contrasenaInput = document.getElementById('contrasenaInput');
const iniciarSesionButton = document.getElementById("iniciarSesionButton");

//window.localStorage.setItem("key", "token");


iniciarSesionButton.onclick = async function(){
    const contrasenaCifrada = await hash( correoElectronicoInput.value + contrasenaInput.value);

    iniciarSesion(correoElectronicoInput.value, contrasenaCifrada);
    
    console.log(window.localStorage.getItem("profile"));
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
            let responseJson = JSON.parse(xhr.responseText);
            //document.cookie = responseJson.stringify;
            window.localStorage.setItem("profile", responseJson.stringify);
        }else{
            console.log(`Error: ${xhr.status}`);
        }
    };

    const body = JSON.stringify({
        correoElectronico: correoElectronico,
        contrasena: contrasenaCifrada
    });

    xhr.send(body);
}

