const configuracionDefecto = {
    plazoMinimo: 1,
    plazoMaximo: 5,
    montoMinimo: 10000,
    montoMaximo: 10000000
}

export async function obtenerConfiguracionSimulador() {
    const url='http://localhost:3000/configuracionSimulador';
    try {
        return await fetch(url);
    } catch (error){
        return configuracionDefecto;
    }
}

export async function actualizarConfiguracionSimulador(nuevaConfiguracion){
    const url='http://localhost:3000/configuracionSimulador';
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(nuevaConfiguracion)
        });
        return response.statusCode;
    }catch (error){
        console.log("hola");
    }
}

export async function reestablecerValores() {
    const url='http://localhost:3000/configuracionSimulador';
    const response = await fetch(url, {method: "POST"});
    return await response.json();
}

