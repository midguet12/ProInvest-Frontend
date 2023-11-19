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
