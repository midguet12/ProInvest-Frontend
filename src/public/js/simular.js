import {obtenerTiposInversion} from "./controllers/tiposInversionController.js"
const tiposInversiones = document.getElementById("tipos-inversiones");
const numberMonto = document.getElementById("monto");
const rangePlazo = document.getElementById("plazo");

let numTiposInversionesSeleccionados = 1;

let mapTiposInversiones= {}

window.addEventListener("load", async function(){
    //inicializarBotonSimularInversion();
    mapTiposInversiones = await obtenerTiposInversion();
    llenarLista();
    graficarTipoInversion();
});

function llenarLista(){
    for (let key in mapTiposInversiones){
        let inputTipoInversion = document.createElement('input');
        inputTipoInversion.setAttribute("id", mapTiposInversiones[key].nombre);
        inputTipoInversion.setAttribute("type", "checkbox");
        inputTipoInversion.setAttribute("autocomplete", "off");
        inputTipoInversion.classList.add("btn-check");
        tiposInversiones.appendChild(inputTipoInversion);

        inputTipoInversion.addEventListener("click", ()=>{
            manejarSeleccion(inputTipoInversion);
            graficarTipoInversion();
        });

        let labelTipoInversion = document.createElement("label");
        labelTipoInversion.classList.add("btn");
        labelTipoInversion.classList.add("btn-outline-primary");
        labelTipoInversion.setAttribute("for", mapTiposInversiones[key].nombre);
        labelTipoInversion.innerText = mapTiposInversiones[key].nombre;

        tiposInversiones.appendChild(labelTipoInversion);
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

function graficarTipoInversion(){
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


const bgColor = [
    "#3FBEAF",
    "#50C0FF",
    "#C196E4",
    "#A0EC71",
];
const data = {
    datasets: [
        {
            label: 'Ganancias por tipo de inversion',
            backgroundColor: bgColor
        }
    ]
}

const grafica = new Chart(
    "grafica",
    {
        type: "bar",
        data: data,
        plugins: [ChartDataLabels],
        options:{
            responsive:true,
            maintainAspectRatio: false,
            scales:{
                y:{
                    type: "linear",
                    beginAtZero: false
                }
            },
            plugins:{
                title:{
                    display: false,
                    text: "Ganancias",
                },
                legend:{
                    display: false,
                },
                datalabels:{
                    anchor: "end",
                    clamp: true,
                    align: "top",
                    offset: 0,
                    formatter: function (value, context){
                        return "$" + new Intl.NumberFormat("es-MX").format(context.dataset.data[context.dataIndex]);
                    }
                }
            }
        }
    }
);

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