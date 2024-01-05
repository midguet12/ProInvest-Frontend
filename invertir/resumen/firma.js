const canvas = document.querySelector('canvas');
const form = document.querySelector('.firma-pad-form');
const botonLimpiar = document.querySelector('.boton-limpiar');
const botonImagen = document.querySelector('.boton-imagen');
const botonContrato = document.querySelector('.boton-contrato');

const mensajeroFirma = document.getElementById("mensajeroFirma");

const ctx = canvas.getContext('2d');
let modoEscritura = false;
let xAnterior = 0, yAnterior = 0, xActual = 0, yActual = 0;
const COLOR = 'blue';
const GROSOR = 2;

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    
    const resultadoContenedor = document.querySelector('.firma-resultado-contenedor');
    const imagenAnterior = document.querySelector('.firma-imagen');

    if(imagenAnterior)
        imagenAnterior.remove();

    const imagenURL = canvas.toDataURL();
    const imagen = document.createElement('img');

    const folioSolicitudGuardado = window.localStorage.getItem("folioSolicitud");
    const body = {
        folioSolicitud: folioSolicitudGuardado,
        firma: imagenURL
    };

    const respuesta = await fetch(urlServidor+"solicitudinversion/firmar", {
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

    console.log(respuesta.status);
    //console.log(respuesta.json());
    let respuestaJSON = await respuesta.json();
    console.log(respuestaJSON.codigoQr);

    if (respuesta.status == 201) {
        mensajeroFirma.style.color = "green";
        mensajeroFirma.innerHTML = "Se ha enviado su firma"
        const imagen = document.createElement('img');
        imagen.src = respuestaJSON.codigoQr;
        imagen.height = canvas.height;
        imagen.width = canvas.width;
        imagen.classList.add('firma-imagen');
        resultadoContenedor.appendChild(imagen);

        
    }



    limpiarPad();
});

const limpiarPad = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width, canvas.height);

};

limpiarPad();

botonLimpiar.addEventListener('click', (e) => {
    e.preventDefault();
    limpiarPad();
});

botonImagen.addEventListener('click', (e) => {
    e.preventDefault

    const enlace = document.createElement('a');
    enlace.download = "Firma.png";

    enlace.href = canvas.toDataURL();
    enlace.click();

});

window.obtenerImagen = () => {
    return canvas.toDataURL();
};

botonContrato.addEventListener('click', (e) =>{
    e.preventDefault();
    const ventana = window.open('contrato.html');
});

const obtenerPosicionCursor = (e) => {
    positionX = e.clientX - e.target.getBoundingClientRect().left;
    positionY = e.clientY - e.target.getBoundingClientRect().top;
    console.log(positionX + " " + positionY);
    return [positionX, positionY];
}

const OnClicOToqueIniciado = (e) => {
    modoEscritura = true;
    [xActual, yActual] = obtenerPosicionCursor(e);

    ctx.beginPath();
    ctx.fillStyle = COLOR;
    ctx.fillRect(xActual, yActual, GROSOR, GROSOR);
    ctx.closePath();
}

const OnMouseODedoMovido = (e) => {
    if(!modoEscritura) return;

    let target = e;
    if (e.type.includes("touch")) {
        target = e.touches[0];
    }

    xAnterior = xActual;
    yAnterior = yActual;

    [xActual, yActual] = obtenerPosicionCursor(target);

    ctx.beginPath();
    ctx.lineWidth = GROSOR;
    ctx.strokeStyle = COLOR;
    ctx.moveTo(xAnterior,yAnterior);
    ctx.lineTo(xActual, yActual);
    ctx.stroke();
    ctx.closePath();
}

function OnClicODedoLEvantado(){
    modoEscritura = false;
}

['mousedown', 'touchstart'].forEach(nombreEvento =>{
    canvas.addEventListener(nombreEvento, OnClicOToqueIniciado, { passive: true});
});

['mousemove', 'touchmove'].forEach(nombreEvento =>{
    canvas.addEventListener(nombreEvento, OnMouseODedoMovido, { passive: true});
});

['mouseup', 'touchend'].forEach(nombreEvento =>{
    canvas.addEventListener(nombreEvento, OnClicODedoLEvantado, { passive: true});
});