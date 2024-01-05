export async function obtenerTiposInversion() {
    const url='http://themaisonbleue.com:4500/tiposInversion';
    const peticion = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    return await fetch(url, peticion);
}


export async function registrarTiposInversion(nuevoTipo){
    const url='http://themaisonbleue.com:4500/tiposInversion';
    const peticion = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevoTipo)
    };
    return await fetch(url, peticion);
}

export async function actualizarTiposInversion(tipoInversion){
    
    const url='http://themaisonbleue.com:4500/tiposInversion';
    const peticion = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(tipoInversion)
    };
    return await fetch(url, peticion);
}

