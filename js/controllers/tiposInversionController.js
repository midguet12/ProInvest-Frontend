export async function obtenerTiposInversion() {
    const url='http://localhost:3000/tiposInversion';
    const respuesta = await fetch(url);
    const tiposInversion = await respuesta.json();

    let mapaTiposInversion = {};
    tiposInversion.forEach(tipo => mapaTiposInversion[tipo.nombre] = tipo);
    return mapaTiposInversion;
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

