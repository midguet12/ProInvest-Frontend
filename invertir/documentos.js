
const curp = document.getElementById("curp");
const identificacionOficial = document.getElementById("identificacionOficial");
const documentos = document.getElementById("documentos");

const urlServidor = "http://localhost:3000/";

async function myFunction(){
    if (validarEntradas()) {
    
        const formData = new FormData(documentos);
        
        try {
            const respuesta = await fetch(urlServidor+"solicitudinversion/cargardocumentos", {
                method: "POST",
                mode: "cors", 
                cache: "no-cache", 
                credentials: "same-origin",
                redirect: "follow", 
                referrerPolicy: "no-referrer", 
                body: formData
            });
        } catch (error) {
            console.log(error);
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


