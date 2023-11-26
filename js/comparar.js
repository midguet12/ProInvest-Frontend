import {obtenerTiposInversion} from "./controllers/tiposInversionController.js"
import {grafica} from "./grafica.js"
import {obtenerConfiguracionSimulador} from "./controllers/configuracionSimuladorController.js";
const tiposInversiones = document.getElementById("tipos-inversiones");
const numberMonto = document.getElementById("monto");
const rangePlazo = document.getElementById("plazo");

let numTiposInversionesSeleccionados = 1;

let mapTiposInversiones= {}

window.addEventListener("load", async function(){
    await llenarListaTiposInversion();
    await configurarSimulador();
    await comparar();
});

async function configurarSimulador(){
    const configuracionSimulador = await (await obtenerConfiguracionSimulador()).json();
    numberMonto.max = configuracionSimulador.montoMaximo;
    numberMonto.min = configuracionSimulador.montoMinimo;
    rangePlazo.min = configuracionSimulador.plazoMinimo;
    rangePlazo.max = configuracionSimulador.plazoMaximo;
}

async function llenarListaTiposInversion(){
    mapTiposInversiones = await obtenerTiposInversion();
    let contador = 0;
    for (let key in mapTiposInversiones){
        let checkTipoInversion = document.createElement('input');
        checkTipoInversion.setAttribute("id", mapTiposInversiones[key].nombre);
        checkTipoInversion.setAttribute("type", "checkbox");
        checkTipoInversion.setAttribute("autocomplete", "off");
        checkTipoInversion.classList.add("btn-check");
        tiposInversiones.appendChild(checkTipoInversion);
        if (contador === 0){
            checkTipoInversion.setAttribute("CHECKED", "");
        }
        checkTipoInversion.addEventListener("click", ()=>{
            manejarSeleccion(checkTipoInversion);
            comparar();
        });

        let labelTipoInversion = document.createElement("label");
        labelTipoInversion.classList.add("btn");
        labelTipoInversion.classList.add("btn-outline-primary");
        labelTipoInversion.setAttribute("for", mapTiposInversiones[key].nombre);
        labelTipoInversion.innerText = mapTiposInversiones[key].nombre;

        tiposInversiones.appendChild(labelTipoInversion);
        contador++;
    }
}

function manejarSeleccion(inputTipoInversion){
    if (estaSeleccionado(inputTipoInversion)){
        inputTipoInversion.removeAttribute("CHECKED");
        numTiposInversionesSeleccionados--;
        if (numTiposInversionesSeleccionados === 3){
            bloquearTiposInversion(false);
        }
    }else{
        inputTipoInversion.setAttribute("CHECKED","");
        numTiposInversionesSeleccionados++;
        if (numTiposInversionesSeleccionados > 3){
            bloquearTiposInversion(true);
        }
    }
}

function comparar(){
    grafica.data.datasets[0].data = [];
    grafica.data.labels = [];
    const seleccion =
        Array.from(tiposInversiones.children).filter(tipo => tipo.hasAttribute("CHECKED"));

    seleccion.forEach((tipo) => {
        let nombreInversion = tipo.getAttribute("id");
        grafica.data.labels.push(nombreInversion);
        let plazoEnAnios = Number(document.getElementById("plazo").value);
        let inversionFinal = Number(document.getElementById("monto").value);
        let tasa = mapTiposInversiones[nombreInversion].tasa;
        for(let i = 0; i<plazoEnAnios; i++){
            inversionFinal += inversionFinal * tasa;
        }
        grafica.data.datasets[0].data.push(inversionFinal);
    });
    grafica.update();
}

function bloquearTiposInversion(bloquear){
    for(let i = 0; i < tiposInversiones.children.length; i += 2){
        if (!estaSeleccionado(tiposInversiones.children[i])){
            if (bloquear){
                tiposInversiones.children[i].setAttribute("DISABLED", "");
            }else{
                tiposInversiones.children[i].removeAttribute("DISABLED");
            }
        }
    }
}

function estaSeleccionado(tipoInversion){
    return tipoInversion.hasAttribute("CHECKED");
}

numberMonto.addEventListener("change", (e) => {
    e.preventDefault();
    sessionStorage.setItem("monto", numberMonto.value);
    comparar();
});

rangePlazo.addEventListener("change", (e) =>{
    e.preventDefault();
    sessionStorage.setItem("plazo", rangePlazo.value);
    comparar();
});