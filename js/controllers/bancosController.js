export async function registrarBancos(nuevoBanco){
    const url='http://localhost:3000/bancos';
    const peticion = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevoBanco)
    };
    return await fetch(url, peticion);
}

export async function actualizarBancos(nuevoBanco){
    const url='http://localhost:3000/bancos';
    const peticion = {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(nuevoBanco)
    };
    return await fetch(url, peticion);
}

export async function obtenerBancos(){
    const url='http://localhost:3000/bancos';
    const peticion = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    };
    return await fetch(url, peticion);
}