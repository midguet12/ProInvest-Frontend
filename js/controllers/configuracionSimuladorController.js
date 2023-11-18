export async function obtenerConfiguracionSimulador() {
    const url='http://localhost:3000/configuracionSimulador';
    const response = await fetch(url);
    const configuracionSimulador = await response.json();
    return configuracionSimulador[0];
}

