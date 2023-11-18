export async function obtenerTiposInversion() {
    const url='http://localhost:3000/tiposInversion';
    const response = await fetch(url);
    const tiposInversion = await response.json();

    let mapaTiposInversion = {};
    tiposInversion.forEach(tipo => mapaTiposInversion[tipo.nombre] = tipo);
    return mapaTiposInversion;
}

