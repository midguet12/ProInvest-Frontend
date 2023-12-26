const correoElectronicoInput = document.getElementById('correoElectronicoInput');
const contrasenaInput = document.getElementById('contrasenaInput');
const iniciarSesionButton = document.getElementById("iniciarSesionButton");

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
            //let responseJson = JSON.parse(xhr.responseText);
            //window.localStorage.setItem("profile", xhr.responseText);

            let redirectUrl = "../profile/index.html";

            let responseJSON = JSON.parse(xhr.responseText);
            let token = responseJSON.token;
            let correoElectronico = responseJSON.correoElectronico;

            if (token != null) {
                //window.localStorage.clear();
                window.localStorage.setItem("token", token);
                window.localStorage.setItem("correoElectronico", correoElectronico);
                window.location.href = redirectUrl;

            } 
            //window.location.href="../profile/index.html"
            /*fetch(redirectUrl,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() =>{
                window.location.href = redirectUrl;
            })
            .catch((error) => {
                console.error(error);
            });*/
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
