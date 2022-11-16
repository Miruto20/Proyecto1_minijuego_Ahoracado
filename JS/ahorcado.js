"use strict";

import palabrasEasy from "./palabras.js";

const pIntentos = document.querySelector("#intentos");
const outputElement = document.querySelector("#output");
const fallosElement = document.querySelector("#fallos");
const formElement = document.forms.letras;
const letraElement = formElement.elements.letra;
const resetButtonElement = document.querySelector("#reset");
const ganasteElemento = document.querySelector(".ganaste");
const imgElement = document.querySelector("img");
const vicElement = document.querySelector("#victorias");

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
  imgElement.setAttribute(
    `src`,
    `/PruebasJMD/Proyectos/01Proy_Ahorcado/Imagenes/Horca1.png`
  );

  laPalabritaArrayGuion = [...laPalabritaGuion];

  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `Fallos ${contadorFallos}/6`;
  fallosElement.innerHTML = `Letras falladas: ${historialLetras}`;
  vicElement.innerHTML = `Victorias: ${historialVictorias}`;
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let letra = document.querySelector("#letra").value;
  /* if (
    letra != "a" ||
    "b" ||
    "c" ||
    "d" ||
    "e" ||
    "f" ||
    "g" ||
    "h" ||
    "i" ||
    "j" ||
    "k" ||
    "l" ||
    "m" ||
    "n" ||
    "ñ" ||
    "o" ||
    "p" ||
    "q" ||
    "r" ||
    "s" ||
    "t" ||
    "u" ||
    "v" ||
    "w" ||
    "x" ||
    "y" ||
    "z" ||
    historialLetras.includes(letra)
  ) {
    console.log("usa español no cirilico");
  } */
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
        imgElement.setAttribute(`src`, `/IMG/Horca2.png`);

        break;
      case 2:
        imgElement.setAttribute(`src`, `/IMG/Horca3.png`);

        break;
      case 3:
        imgElement.setAttribute(`src`, `/IMG/Horca4.png`);

      case 4:
        imgElement.setAttribute(`src`, `/IMG/Horca5.png`);

        break;
      case 5:
        imgElement.setAttribute(`src`, `/IMG/Horca6.png`);

        break;
      case 6:
        imgElement.setAttribute(`src`, `/IMG/Horca7.png`);

        break;
    }
  }
  if (contadorFallos > 5) {
    ganasteElemento.textContent = "P E R DIES T E";
    historialVictorias = 0;
  }

  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `Fallos ${contadorFallos}/6`;
  fallosElement.innerHTML = `Letras falladas: ${historialLetras}`;
  vicElement.innerHTML = `Victorias: ${historialVictorias}`;

  letraElement.value = "";

  if (!laPalabritaArrayGuion.includes("_")) {
    console.log("ganaste");
    ganasteElemento.textContent = "G A N A S T E ";
    historialVictorias++;
    console.log(historialVictorias);
    vicElement.innerHTML = `Victorias: ${historialVictorias}`;
  }
});

resetButtonElement.addEventListener("click", () => {
  main();
});

main();
