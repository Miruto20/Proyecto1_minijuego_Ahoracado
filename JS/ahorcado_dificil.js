"use strict";

import palabrasHard from "./palabras.js";

//misma lógica que el "ahoracado.js" con la unica diferencia que este emplea otra lista de palabras.
const pIntentos = document.querySelector("#intentos");
const outputElement = document.querySelector("#output");
const fallosElement = document.querySelector("#fallos");
const formElement = document.forms.letras;
const letraElement = formElement.elements.letra;
const resetButtonElement = document.querySelector("#reset");
const popButtonElement = document.querySelector("#pop");
const ganasteElemento = document.querySelector(".ganaste");
const bodyElement = document.querySelector(".body1");
const vicElement = document.querySelector("#victorias");
const NoWinElement = document.querySelector(".none");
const loseElement = document.querySelector(".none1");
const popPElemento = document.querySelector("#popP");

let contadorFallos;
let historialLetras;
let laPalabritaGuion;
let laPalabritaArray;
let laPalabritaArrayGuion;
let laPalabra;
let historialVictorias = 0;

function main() {
  //reseteo
  contadorFallos = 0;
  historialLetras = [];
  laPalabritaGuion = "";
  ganasteElemento.innerHTML = ``;
  laPalabra = palabrasHard[Math.floor(Math.random() * palabrasHard.length)];
  console.log(laPalabra);
  console.log(laPalabra.pista1, laPalabra.objeto);

  popPElemento.textContent = "";

  laPalabritaArray = [...laPalabra.objeto];
  laPalabritaGuion = laPalabra.objeto.replace(/./g, "_");
  if (NoWinElement.classList.contains("noGanasteAun")) {
    NoWinElement.classList.replace("noGanasteAun", "none");
  }
  if (loseElement.classList.contains("noGanasteAun1")) {
    loseElement.classList.replace("noGanasteAun1", "none1");
  }

  let nombreClase = bodyElement.classList;
  console.log(nombreClase);
  bodyElement.classList.replace(nombreClase, "body1");

  laPalabritaArrayGuion = [...laPalabritaGuion];

  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `FALLOS ${contadorFallos}/6 `;
  fallosElement.innerHTML = `LETRAS FALLADAS: ${historialLetras}`;
  vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let letra = document.querySelector("#letra").value;
  letra = letra.toLowerCase();

  for (let i of laPalabritaArray) {
    let posicionI = laPalabritaArray.indexOf(i, 0);

    if (letra == i) {
      laPalabritaArrayGuion[posicionI] = letra;

      laPalabritaArray[posicionI] = null;
    }
  }
  if (!laPalabra.objeto.includes(letra)) {
    contadorFallos++;
    historialLetras.push(letra);
    switch (contadorFallos) {
      case 1:
        bodyElement.classList.replace("body1", "body2");
        break;
      case 2:
        bodyElement.classList.replace("body2", "body3");

        break;
      case 3:
        bodyElement.classList.replace("body3", "body4");

        break;
      case 4:
        bodyElement.classList.replace("body4", "body5");

        break;
      case 5:
        bodyElement.classList.replace("body5", "body6");

        break;
      case 6:
        bodyElement.classList.replace("body6", "body7");

        break;
    }
  }
  if (contadorFallos > 5) {
    ganasteElemento.textContent = "PERDISTE";
    historialVictorias = 0;
    loseElement.classList.replace("none1", "noGanasteAun1");
  }

  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `FALLOS ${contadorFallos}/6`;
  fallosElement.innerHTML = `LETRAS FALLADAS: ${historialLetras}`;
  vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;

  letraElement.value = "";

  if (!laPalabritaArrayGuion.includes("_")) {
    console.log("ganaste");
    ganasteElemento.textContent = "GANASTE";
    historialVictorias++;
    console.log(historialVictorias);
    vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;
    NoWinElement.classList.replace("none", "noGanasteAun");
  }
});

resetButtonElement.addEventListener("click", () => {
  main();
});

main();

popButtonElement.addEventListener("click", () => {
  popPElemento.textContent = `${laPalabra.pista1}`;
});
