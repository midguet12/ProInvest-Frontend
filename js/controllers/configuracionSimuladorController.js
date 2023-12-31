const configuracionDefecto = {
    plazoMinimo: 1,
    plazoMaximo: 5,
    montoMinimo: 10000,
    montoMaximo: 10000000
}

export async function obtenerConfiguracionSimulador() {
    const url='http://themaisonbleue.com:4500/configuracionSimulador';
    try {
        return await fetch(url);
    } catch (error){
        return configuracionDefecto;
    }
}

export async function actualizarConfiguracionSimulador(nuevaConfiguracion){
    const url='http://themaisonbleue.com:4500/configuracionSimulador';

    return await fetch(url, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevaConfiguracion)
    });


}

export async function reestablecerValores() {
    const url='http://themaisonbleue.com:4500/configuracionSimulador';
    const response = await fetch(url, {method: "POST"});
    return await response.json();
}

