import {obtenerTiposInversion} from "./controllers/tiposInversionController.js"
import {obtenerConfiguracionSimulador} from "./controllers/configuracionSimuladorController.js"
import {grafica} from "./grafica.js"
const tiposInversiones = document.getElementById("tipos-inversiones");
const numberMonto = document.getElementById("monto");
const rangePlazo = document.getElementById("plazo");

let mapTiposInversiones= {}

window.addEventListener("load", async function(){
    await llenarListaTiposInversion();
    await configurarSimulador();
    await graficarTipoInversion();
});

async function configurarSimulador(){
    const configuracionSimulador = await obtenerConfiguracionSimulador();
    numberMonto.max = configuracionSimulador.montoMaximo;
    numberMonto.min = configuracionSimulador.montoMinimo;
    rangePlazo.min = configuracionSimulador.plazoMinimo;
    rangePlazo.max = configuracionSimulador.plazoMaximo;
}

async function llenarListaTiposInversion(){
    mapTiposInversiones = await obtenerTiposInversion();
    let contador = 0 ;
    for (let key in mapTiposInversiones){
        let radioTipoInversion = document.createElement('input');
        radioTipoInversion.setAttribute("id", mapTiposInversiones[key].nombre);
        radioTipoInversion.setAttribute("type", "radio");
        radioTipoInversion.setAttribute("name", "tipos-inversion");
        radioTipoInversion.setAttribute("autocomplete", "off");
        radioTipoInversion.classList.add("btn-check");
        tiposInversiones.appendChild(radioTipoInversion);
        if (contador === 0){
            radioTipoInversion.setAttribute("CHECKED", "");
        }
        radioTipoInversion.addEventListener("click", ()=>{
            graficarTipoInversion();
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

function graficarTipoInversion(inputTipoInversion){
    grafica.data.datasets[0].data = [];
    grafica.data.labels = [];
    const nombreTipoInversionSeleccionado =
        Array.from(tiposInversiones.children)
             .find(tipo => tipo.type === "radio" && tipo.checked)
             .id;
    const tipoInversion = mapTiposInversiones[nombreTipoInversionSeleccionado];
    const plazo = document.getElementById("plazo").value;
    let monto =  Number(document.getElementById("monto").value);
    for (let i = 0; i < plazo; i++){
        grafica.data.labels.push(`Año ${i+1}`);
        monto += monto * tipoInversion.tasa;
        grafica.data.datasets[0].data.push(monto);
    }
    grafica.update();
}

numberMonto.addEventListener("change", (e) => {
    e.preventDefault();
    sessionStorage.setItem("monto", numberMonto.value);
    graficarTipoInversion();
});

rangePlazo.addEventListener("change", (e) =>{
    e.preventDefault();
    sessionStorage.setItem("plazo", rangePlazo.value);
    graficarTipoInversion();
});
