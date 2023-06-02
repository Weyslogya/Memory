const STARTING = document.querySelector(".starting");
const ENDING = document.querySelector(".ending");
const PLAYS = document.querySelectorAll(".start");
const CARTES = document.querySelectorAll(".carte");
const FILTRES = document.querySelectorAll(".noir");
const TIMES = document.querySelectorAll(".time");
const CLICKS = document.querySelectorAll(".click");

/* Mise en place du chrono et du compteur de clique */

let temps = 0;
let clickCount = 0;
let timer;

TIMES.forEach((time) => time.innerHTML = temps);
CLICKS.forEach((click) => click.innerHTML = clickCount);

function timeUp() {
  temps++;
  TIMES.forEach((time) => time.innerHTML = temps);
}

function resetChrono() {
  temps = 0;
  TIMES.forEach((time) => time.innerHTML = temps);
}

function clickUp() {
  clickCount++;
  CLICKS.forEach((click) => click.innerHTML = clickCount);
}

/* Mise en place des pop-up d'ouverture et de fermeture du jeu */

function openModal() {
  setTimeout(() => {
    STARTING.style.display = "block";
  }, 500);
}

function closeModal() {
  window.removeEventListener("scroll", openModal);
  STARTING.style.display = "none";
  ENDING.style.display = "none";
}

/* Mise en place des fonction pré-requis du jeux */

let limiteCarte = false;

function melange() {
  CARTES.forEach((carte) => {
    let aleatoire = Math.floor(Math.random() * 16);
    carte.style.order = aleatoire;
  });
}

function resetJeu() {
  setTimeout(() => {
    FILTRES.forEach((filtre) => filtre.classList.remove("noir"));
  }, 500);
  CARTES.forEach((carte) => carte.classList.remove("flip"));
  limiteCarte = false;
  carteUne = null;
  carteDeux = null;
  clickCount = 0;
  CLICKS.forEach((click) => click.innerHTML = clickCount);
  resetChrono();
  timer = setInterval(() => {
    timeUp();
  }, 1000);
}

/* Fonction du jeu */

function game() {
  closeModal();
  resetJeu();
  setTimeout(() => {
    melange();
  }, 0800);

  let carteUne, carteDeux;
  limiteCarte = false;

  function resetCarte() {
    if (carteDeux) {
      carteUne = undefined;
      carteDeux = undefined;
    }
  }

  function flipCarte(event) {
    if (limiteCarte) {
      return;
    }

    const carte = event.target.closest(".carte");
    carte.removeEventListener("click", flipCarte);
    carte.classList.add("flip");

    if (carteUne) {
      carteDeux = carte;
      matching();
    } else {
      carteUne = carte;
    }

    clickUp();
  }

  function matching() {
    if (carteUne.dataset.paire === carteDeux.dataset.paire) {
      resetCarte();
    } else {
      limiteCarte = true;
      setTimeout(() => {
        carteUne.addEventListener("click", flipCarte);
        carteDeux.addEventListener("click", flipCarte);
        carteUne.classList.remove("flip");
        carteDeux.classList.remove("flip");
        resetCarte();
        limiteCarte = false;
      }, 1500);
    }
    let finish = true;

    for (let i = 0; i < CARTES.length; i++) {
      if (!CARTES[i].classList.contains("flip")) {
        finish = false;
        break;
      }
    }

    if (finish) {
      setTimeout(() => {
        ENDING.style.display = "block";
      }, 800);
      clearInterval(timer);
    }
  }
  CARTES.forEach((carte) => carte.addEventListener("click", flipCarte));
}
PLAYS.forEach((play) => play.addEventListener("click", game));
window.addEventListener("DOMContentLoaded", openModal);
