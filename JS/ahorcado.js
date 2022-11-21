"use strict";

import palabrasEasy from "./palabras.js";
// importamos el JS de palabras

//constituimos los distintos elemenmtos que necesitaremos para referirnos al HTML en adelante e implementar en esos elementos el codigo descrito
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

//inicializamos y creamos las variables que necesitamos para llevar a cabo este juego

let contadorFallos; // cuenta el numero de fallos del jugador
let historialLetras; // aqui guardamos los fallos
let laPalabritaGuion; // usaremos esta variable para transformar en guiones la palabra del array que tendra que ser adivinada (y mostraremos en la pantalla)
let laPalabritaArray; //una vez seleccionada de forma random la palabra la transformamos en array para su futuro uso
let laPalabritaArrayGuion; // la palabra que mostraremos en pantalla al usuario, sera laPalabritaArray tranformada en guiones mietnras no va resolviendo las letras
let laPalabra; //esta es la palabra random escogida
let historialVictorias = 0; //registro de victorias del jugador

function main() {
  //reseteo
  contadorFallos = 0;
  historialLetras = [];
  laPalabritaGuion = "";
  ganasteElemento.innerHTML = ``;
  laPalabra = palabrasEasy[Math.floor(Math.random() * palabrasEasy.length)];
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

  //vemos que clase tiene en este momento de reseteo el body (lo cual depende del numero de fallos), y como reseteamos y empezamos nueva partida volvemos al inicial
  //para ello descubrimos en nombreClase que clase tiene en ese momento para sustituirlo por la que debe tener inicialmente.
  let nombreClase = bodyElement.classList;
  console.log(nombreClase);
  bodyElement.classList.replace(nombreClase, "body1");

  laPalabritaArrayGuion = [...laPalabritaGuion];

  outputElement.innerHTML = laPalabritaArrayGuion.join(" "); //con el join cambiamos las comas que separan el array por (" ")
  pIntentos.innerHTML = `FALLOS ${contadorFallos}/6 `;
  fallosElement.innerHTML = `LETRAS FALLADAS: ${historialLetras}`;
  vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;
}

//creamos el evento de guardar y analizar la "letra" que envia el jugador al hacer "click" en "submit" asociado a probar letra.
//luego guardamos en let letra esa letra con la que juega el usuario para usarla en la logica del juego.
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  let letra = document.querySelector("#letra").value;
  console.log(letra);
  letra = letra.toLowerCase();
  console.log(letra);
  //creamos un loop para compararla con la palabritArray y comparar que sean o no iguales y asi luego sustituirla en la posicionI equivalente al acierto en laPalabritaArrayGuion (la mostrada)
  for (let i of laPalabritaArray) {
    let posicionI = laPalabritaArray.indexOf(i, 0);

    if (letra == i) {
      laPalabritaArrayGuion[posicionI] = letra;

      laPalabritaArray[posicionI] = null;
    }
  }
  //aqui abajo vamos actualizando el fondo de pantalla acorde al numero de fallos. Para ello nos basamos en la sustitucion  de la clase del body configurada en el css.
  //usamos un SWitch case en base al contador de fallos.
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

        // imgElement.setAttribute(`src`, `/IMG/Horca7.png`);
        break;
    }
  }
  //Logica del juego si pierdes
  if (contadorFallos > 5) {
    ganasteElemento.textContent = "PERDISTE";
    historialVictorias = 0;
    loseElement.classList.replace("none1", "noGanasteAun1");
  }
  //valores iniciales mostrados y actualizacion tras cada iteracion
  outputElement.innerHTML = laPalabritaArrayGuion.join(" ");
  pIntentos.innerHTML = `FALLOS ${contadorFallos}/6`;
  fallosElement.innerHTML = `LETRAS FALLADAS: ${historialLetras}`;
  vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;

  letraElement.value = "";
  //Logica de victoria del juego
  if (!laPalabritaArrayGuion.includes("_")) {
    console.log("ganaste");
    ganasteElemento.textContent = "GANASTE";
    historialVictorias++;
    console.log(historialVictorias);
    vicElement.innerHTML = `VICTORIAS: ${historialVictorias}`;
    NoWinElement.classList.replace("none", "noGanasteAun");
  }
});
//boton de cambio de palabra
resetButtonElement.addEventListener("click", () => {
  main();
});
//inicializacion del juego
main();
//boton para solicitar una pista y su funcionamiento.
popButtonElement.addEventListener("click", () => {
  popPElemento.textContent = `${laPalabra.pista1}`;
});
