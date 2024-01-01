const numeroExterior = document.getElementById("numeroExterior");
const numeroInterior = document.getElementById("numeroInterior");
const codigoPostal = document.getElementById("codigoPostal");
const colonia = document.getElementById("colonia");
const estado = document.getElementById("estado");
const municipio = document.getElementById("municipio");
const mensajero = document.getElementById("mensajero");


function myFunction(){
    

    if (numeroExterior.checkValidity() &&
        numeroInterior.checkValidity() &&
        codigoPostal.checkValidity() &&
        colonia.checkValidity() &&
        estado.checkValidity() &&
        municipio.checkValidity() 
    ) {
        
        window.localStorage.setItem("numeroExterior", numeroExterior.value);
        window.localStorage.setItem("numeroInterior", numeroInterior.value);
        window.localStorage.setItem("codigoPostal", codigoPostal.value);
        window.localStorage.setItem("colonia", colonia.value);
        window.localStorage.setItem("estado", estado.value);
        window.localStorage.setItem("municipio", municipio.value);

        mensajero.style.color = "Green";
        mensajero.innerHTML = "Guardando datos de domicilio...";

        setTimeout(()=>{
            window.location.href = "bancaria.html";
        },1000 * 1);

       
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