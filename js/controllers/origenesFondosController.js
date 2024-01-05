export async function registrarOrigenFondo(nuevoOrigenFondo){
    const url='http://localhost:3000/origenesFondos';
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
    const url='http://localhost:3000/origenesFondos';
    const peticion = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    return await fetch(url, peticion);
}

export async function actualizarOrigenFondo(origenFondo){
    
    const url='http://localhost:3000/origenesFondos';
    const peticion = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(origenFondo)
    };
    return await fetch(url, peticion);
}