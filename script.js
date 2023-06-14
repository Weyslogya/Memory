const starting = document.querySelector(".starting");
const ending = document.querySelector(".ending");
const plays = document.querySelectorAll(".start");
const cartes = document.querySelectorAll(".carte");
const filtres = document.querySelectorAll(".noir");
const times = document.querySelectorAll(".time");
const clicks = document.querySelectorAll(".click");
const easyMode = document.querySelector(".easygame");
const MediuMode = document.querySelector(".mediumgame");
const hardMode = document.querySelector(".hardgame");
const easys = document.querySelectorAll(".easy");
const mediums = document.querySelectorAll(".medium");
const hards = document.querySelectorAll(".hard");
let level = "";

/* Mise en place du chrono et du compteur de clique */

let temps = 0;
let clickCount = 0;
let timer;

times.forEach((time) => (time.innerHTML = temps));
clicks.forEach((click) => (click.innerHTML = clickCount));

function timeUp() {
  temps++;
  times.forEach((time) => (time.innerHTML = temps));
}

function resetChrono() {
  temps = 0;
  times.forEach((time) => (time.innerHTML = temps));
}

function clickUp() {
  clickCount++;
  clicks.forEach((click) => (click.innerHTML = clickCount));
}

/* Mise en place des pop-up d'ouverture et de fermeture du jeu */

function openModal() {
  setTimeout(() => {
    starting.style.display = "block";
  }, 500);
}

function closeModal() {
  window.removeEventListener("scroll", openModal);
  starting.style.display = "none";
  ending.style.display = "none";
}

/* Mise en place des fonctions de fin du jeu */
function basicEnd() {
  let finish = true;
  for (let i = 0; i < cartes.length; i++) {
    if (!cartes[i].classList.contains("flip")) {
      finish = false;
      break;
    }
  }
  if (finish) {
    setTimeout(() => {
      ending.style.display = "block";
    }, 800);
    clearInterval(timer);
  }
}

function easyEnd() {
  if (level === "easy") {
    let easyFinish = true;
    for (let i = 0; i < easys.length; i++) {
      if (!easys[i].classList.contains("flip")) {
        easyFinish = false;
        break;
      }
    }
    if (easyFinish) {
      setTimeout(() => {
        ending.style.display = "block";
      }, 800);
    }
  }
}

function mediumEnd() {
  if (level === "medium") {
    let mediumFinish = true;
    for (let i = 0; i < mediums.length; i++) {
      if (!mediums[i].classList.contains("flip")) {
        mediumFinish = false;
        break;
      }
    }
    if (mediumFinish) {
      setTimeout(() => {
        ending.style.display = "block";
      }, 800);
    }
  }
}

function hardEnd() {
  if (level === "hard") {
    let hardFinish = true;
    for (let i = 0; i < hards.length; i++) {
      if (!hards[i].classList.contains("flip")) {
        hardFinish = false;
        break;
      }
    }
    if (hardFinish) {
      setTimeout(() => {
        ending.style.display = "block";
      }, 800);
    }
  }
}

function finishGame() {
  basicEnd();
  if (level === "easy") {
    easyEnd();
  } else if (level === "medium") {
    mediumEnd();
  } else if (level === "hard") {
    hardEnd();
  }
}

/* Mise en place des fonction pré-requis du jeux */

let carteUne, carteDeux;
let limiteCarte = false;

function melange() {
  cartes.forEach((carte) => {
    let aleatoire = Math.floor(Math.random() * 16);
    carte.style.order = aleatoire;
  });
}

function resetNiveau() {
  cartes.forEach((carte) => carte.addEventListener("click", flipCarte));
}

function resetConfig() {
  clearInterval(timer);
  resetNiveau();
  setTimeout(() => {
    filtres.forEach((filtre) => filtre.classList.remove("noir"));
  }, 400);
  cartes.forEach((carte) => carte.classList.remove("flip"));
  limiteCarte = false;
  resetCarte();
  clickCount = 0;
  clicks.forEach((click) => (click.innerHTML = clickCount));
  resetChrono();
  timer = setInterval(() => {
    timeUp();
  }, 1000);
}

function resetGame() {
  closeModal();
  resetConfig();
  setTimeout(() => {
    melange();
  }, 600);
}

/* Fonction du jeu */

function game() {
  resetGame();

  activeCards(cartes);
}

function resetCarte() {
  if (carteDeux) {
    carteUne = undefined;
    carteDeux = undefined;
  }
}
function matching() {
  if (carteUne.dataset.paire === carteDeux.dataset.paire) {
    resetCarte(carteUne, carteDeux);
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
  finishGame();
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
    matching(carteUne, carteDeux);
  } else {
    carteUne = carte;
  }
  clickUp();
}

function activeCards(cards) {
  cards.forEach((carte) => carte.addEventListener("click", flipCarte));
}


/* Configuration des niveaux*/
function easyModeConfig() {
  playEasy = true;
  playMedium = false;
  playHard = false;
  hards.forEach((hard) => (hard.style.display = "none"));
  hards.forEach((medium) => (medium.style.display = "none"));
  easys.forEach((easy) => (easy.style.display = "block"));
  easys.forEach((easy) => (easy.style.width = "calc(25% - 1rem)"));
  easys.forEach((easy) => (easy.style.height = "calc(40% - 1rem)"));
}

function mediumModeConfig() {
  playMedium = true;
  playEasy = false;
  playHard = false;
  easys.forEach((easy) => (easy.style.display = "none"));
  hards.forEach((hard) => (hard.style.display = "none"));
  mediums.forEach((medium) => (medium.style.display = "block"));
  mediums.forEach((medium) => (medium.style.width = "calc(25% - 1rem)"));
  mediums.forEach((medium) => (medium.style.height = "calc(30% - 1rem)"));
}

function hardModeConfig() {
  playHard = true;
  playEasy = false;
  playMedium = false;
  mediums.forEach((medium) => (medium.style.display = "none"));
  easys.forEach((easy) => (easy.style.display = "none"));
  hards.forEach((hard) => (hard.style.display = "block"));
  hards.forEach((hard) => (hard.style.width = "calc(20% - 1rem)"));
  hards.forEach((hard) => (hard.style.height = "calc(30% - 1rem)"));
}

function playEasy() {
  level = "easy";

  resetGame();
  easyModeConfig();
}

function playMedium() {
  level = "medium";

  resetGame();
  mediumModeConfig();
}

function playHard() {
  level = "hard";

  resetGame();
  hardModeConfig();
}

plays.forEach((play) => play.addEventListener("click", game));
easyMode.addEventListener("click", playEasy);
MediuMode.addEventListener("click", playMedium);
hardMode.addEventListener("click", playHard);
window.addEventListener("DOMContentLoaded", openModal);