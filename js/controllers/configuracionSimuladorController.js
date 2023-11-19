export async function obtenerConfiguracionSimulador() {
    const url='http://localhost:3000/configuracionSimulador';
    const response = await fetch(url);
    const configuracionSimulador = await response.json();
    return configuracionSimulador[0];
}

export async function actualizarConfiguracionSimulador(nuevaConfiguracion){
    const url='http://localhost:3000/configuracionSimulador';
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevaConfiguracion)
    });
    return response.statusCode;
}

export async function reestablecerValores() {
    const url='http://localhost:3000/configuracionSimulador';
    const response = await fetch(url, {method: "POST"});
    return await response.json();
}

