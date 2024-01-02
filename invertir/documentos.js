
const curp = document.getElementById("curp");
const identificacionOficial = document.getElementById("identificacionOficial");
const correoElectronicoInput = document.getElementById("correoElectronicoInput");

const correoElectronico = window.localStorage.getItem("correoElectronico");
correoElectronicoInput.value = correoElectronico;


