"use strict";

import palabrasEasy from "./palabras.js";

const pIntentos = document.querySelector("#intentos");
const outputElement = document.querySelector("#output");
const fallosElement = document.querySelector("#fallos");
const formElement = document.forms.letras;
const letraElement = formElement.elements.letra;
const resetButtonElement = document.querySelector("#reset");
const ganasteElemento = document.querySelector(".ganaste");
// const imgElement = document.querySelector("img");
const bodyElement = document.querySelector(".body1");
const vicElement = document.querySelector("#victorias");
const NoWinElement = document.querySelector(".none");
const loseElement = document.querySelector(".none1");

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
  laPalabra = palabrasEasy[Math.floor(Math.random() * palabrasEasy.length)];
  console.log(laPalabra);
  laPalabritaArray = [...laPalabra];
  laPalabritaGuion = laPalabra.replace(/./g, "_");
  if (NoWinElement.classList.contains("noGanasteAun")) {
    NoWinElement.classList.replace("noGanasteAun", "none");
  }
  if (loseElement.classList.contains("noGanasteAun1")) {
    loseElement.classList.replace("noGanasteAun1", "none1");
  }
  // bodyElement.setAttribute(
  //   `background:`,
  //   `url(/IMG/ImgFondoFavo.jpg) no-repeat center`
  // );
  let nombreClase = bodyElement.classList;
  console.log(nombreClase);
  bodyElement.classList.replace(nombreClase, "body1");

  laPalabritaArrayGuion = [...laPalabritaGuion];

  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `FALLOS ${contadorFallos}/6 `;
  fallosElement.innerHTML = `LETRAS FALLADAS: ${historialLetras}`;
  vicElement.innerHTML = `Victorias: ${historialVictorias}`;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let letra = document.querySelector("#letra").value;

  for (let i of laPalabritaArray) {
    let posicionI = laPalabritaArray.indexOf(i, 0);

    if (letra == i) {
      laPalabritaArrayGuion[posicionI] = letra;

      laPalabritaArray[posicionI] = null;
    }
  }
  if (!laPalabra.includes(letra)) {
    contadorFallos++;
    historialLetras.push(letra);
    switch (contadorFallos) {
      case 1:
        // imgElement.setAttribute(`src`, `/IMG/Horca2.png`);
        bodyElement.classList.replace("body1", "body2");
        break;
      case 2:
        bodyElement.classList.replace("body2", "body3");

        // imgElement.setAttribute(`src`, `/IMG/Horca3.png`);
        break;
      case 3:
        bodyElement.classList.replace("body3", "body4");

        // imgElement.setAttribute(`src`, `/IMG/Horca4º.png`);
        break;
      case 4:
        bodyElement.classList.replace("body4", "body5");

        // imgElement.setAttribute(`src`, `/IMG/Horca5.png`);
        break;
      case 5:
        bodyElement.classList.replace("body5", "body6");

        // imgElement.setAttribute(`src`, `/IMG/Horca6.png`);
        break;
      case 6:
        bodyElement.classList.replace("body6", "body7");

        // imgElement.setAttribute(`src`, `/IMG/Horca7.png`);
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
  vicElement.innerHTML = `Victorias: ${historialVictorias}`;

  letraElement.value = "";

  if (!laPalabritaArrayGuion.includes("_")) {
    console.log("ganaste");
    ganasteElemento.textContent = "GANASTE";
    historialVictorias++;
    console.log(historialVictorias);
    vicElement.innerHTML = `Victorias: ${historialVictorias}`;
    NoWinElement.classList.replace("none", "noGanasteAun");
  }
});

resetButtonElement.addEventListener("click", () => {
  main();
});

main();
