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
