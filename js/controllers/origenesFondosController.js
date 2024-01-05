export async function registrarOrigenFondo(nuevoOrigenFondo){
    const url='http://themaisonbleue.com:4500/origenesFondos';
    const peticion = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevoOrigenFondo)
    };
    return await fetch(url, peticion);
}

export async function obtenerOrigenesDeFondos() {
    const url='http://themaisonbleue.com:4500/origenesFondos';
    const peticion = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    return await fetch(url, peticion);
}

export async function actualizarOrigenFondo(origenFondo){
    
    const url='http://themaisonbleue.com:4500/origenesFondos';
    const peticion = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(origenFondo)
    };
    return await fetch(url, peticion);
}