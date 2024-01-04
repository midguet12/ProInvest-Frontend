export async function obtenerTiposInversion() {
    const url='http://localhost:3000/tiposInversion';
    const peticion = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    return await fetch(url, peticion);
}


export async function registrarTiposInversion(nuevoTipo){
    const url='http://localhost:3000/tiposInversion';
    const peticion = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevoTipo)
    };
    return await fetch(url, peticion);
}

