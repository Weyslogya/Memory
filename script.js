const cartes = document.querySelectorAll(".carte");

let carteUne, carteDeux;
let limiteCarte = false;

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

/*  Faire une fonction bloquant plus de 2 carte
    Faire une fonction pour le bouton jouer
    Faire une fonction pour mélanger les cartes*/