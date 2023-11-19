addEventListener("DOMContentLoaded", () =>{
    if (localStorage.getItem("error") !== null){
        document.getElementById("modal-error-mensaje").innerHTML = (localStorage.getItem("error"));
        $("#modal-error").modal("show");
        localStorage.removeItem("error")
    } else if (localStorage.getItem("exito") !== null) {
        document.getElementById("toast-mensaje").innerHTML = (localStorage.getItem("exito"));
        const toast = new bootstrap.Toast(document.getElementById("toast"));
        toast.show();
        localStorage.removeItem("exito")
    }
})

export async function manejar(respuesta){
    const json = await respuesta.json();
    if (respuesta.ok){
        localStorage.setItem("exito", `${json.mensaje}`)
    }else{
        localStorage.setItem("error", `${json.mensaje}`)
    }
}