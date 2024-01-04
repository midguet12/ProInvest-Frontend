const origenFondos = document.getElementById("origenFondos");
const banco = document.getElementById("banco");
const cuenta = document.getElementById("cuenta");
const clabeInterbancaria = document.getElementById("clabeInterbancaria");

const mensajero = document.getElementById("mensajero");

function myFunction(){
    if (origenFondos.checkValidity() &&
        banco.checkValidity() &&
        cuenta.checkValidity() &&
        clabeInterbancaria.checkValidity()
    ){
        try {
            window.localStorage.setItem("origenFondos", origenFondos.value);
            window.localStorage.setItem("banco", banco.value);
            window.localStorage.setItem("cuenta", cuenta.value);
            window.localStorage.setItem("clabeInterbancaria", clabeInterbancaria.value);

            mensajero.style.color = "Green";
            mensajero.innerHTML = "Guardando datos bancarios...";

            setTimeout(()=>{
                window.location.href = "http://www.google.com";
            },1000 * 1);

        } catch (error) {
            console.log(error)
        }
        
    }
}