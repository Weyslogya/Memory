const modal = document.querySelector(".modal")
const play = document.querySelector(".start");
const cartes = document.querySelectorAll(".carte");
const filtres = document.querySelectorAll(".noir");

console.log(modal)

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function timer() {
  
}

let limiteCarte = false;

function melange() {
  cartes.forEach((carte) => {
    let aleatoire = Math.floor(Math.random() * 16);
    carte.style.order = aleatoire;
  });
}

function resetJeu() {
  filtres.forEach((filtre) => filtre.classList.remove("noir"));
  cartes.forEach((carte) => carte.classList.remove("flip"));
  limiteCarte = false;
  carteUne = null;
  carteDeux = null;
}

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

    let carteFlippée = carte.className.includes("flip");
    if (carteFlippée) {
      return;
    }

    carte.classList.add("flip");

    if (carteUne) {
      carteDeux = carte;
    } else {
      carteUne = carte;
    }
    matching();
  }

  function matching() {
    if (!carteDeux) {
      return;
    }

    if (carteUne.dataset.paire === carteDeux.dataset.paire) {
      carteUne.removeEventListener("click", flipCarte);
      carteDeux.removeEventListener("click", flipCarte);
      resetCarte();
    } else {
      limiteCarte = true;
      setTimeout(() => {
        carteUne.classList.remove("flip");
        carteDeux.classList.remove("flip");
        resetCarte();
        limiteCarte = false;
      }, 1500);
    }
  }
  cartes.forEach((carte) => carte.addEventListener("click", flipCarte));
}
play.addEventListener("click", game);