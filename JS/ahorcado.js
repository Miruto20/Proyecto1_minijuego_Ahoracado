"use strict";
const palabrasEasy = [
  "gato",
  "perro",
  "luna",
  "sol",
  "pizza",
  "sandia",
  "futbol",
  "boxeo",
  "pagina",
  "raton",
  "coche",
  "macaco",
];
const laPalabra = palabrasEasy[Math.floor(Math.random() * palabrasEasy.length)];
let laPalabraGuion = laPalabra.replace(/./g, "_ ");
let botonLetra = document.querySelector("#letra");
let contadorFallos = 0;
let historialLetras = [];
let pIntentos = document.querySelector("#intentos");
const letra = console.log(laPalabra);
const formElement = document.forms.letras;
const letraElement = formElement.elements.letra;
console.log(letraElement);
document.querySelector("#add").addEventListener("click", () => {
  let letra = document.querySelector("#letra").value;
  let fallo = true;
  for (const i in laPalabra) {
    if (letra == laPalabra[i]) {
      console.log("Acertaste la letra");
      laPalabraGuion = laPalabraGuion.replace(laPalabraGuion[i * 2], letra);
      fallo = false;
    }
  }
  if (!laPalabra.includes(letra)) {
    contadorFallos++;
    historialLetras.push(letra);

    switch (contadorFallos) {
      case 1:
        document.querySelector("img").classList.replace("imagenA", "imagenA-1");
        break;
      case 2:
        document
          .querySelector("img")
          .classList.replace("imagenA-1", "imagenA-2");
        break;
      case 3:
        document
          .querySelector("img")
          .classList.replace("imagenA-2", "imagenA-3");
        break;
      case 4:
        document
          .querySelector("img")
          .classList.replace("imagenA-3", "imagenA-4");
        break;
      case 5:
        document
          .querySelector("img")
          .classList.replace("imagenA-4", "imagenA-5");
        break;
      case 6:
        document
          .querySelector("img")
          .classList.replace("imagenA-5", "imagenA-6");

        break;
    }
  }
  if (contadorFallos > 5) {
    alert("A LA HORCA!!!");
  }
  pIntentos.innerHTML = `Fallos ${contadorFallos}/6`;
  document.querySelector("#output").innerHTML = laPalabraGuion;
  document.querySelector(
    "#fallos"
  ).innerHTML = `Letras falladas ${historialLetras}`;
  letraElement.value = "";

  //añado If para el caso de ganar, esto es, la palabracon guiones es ahora igual que la palabra
  if (!laPalabraGuion.includes("_")) {
    console.log("ganaste");
    document.querySelector(".ganaste").textContent += "G A N A S T E ";
  }
});
