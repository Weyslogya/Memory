/*describe("Test de la fonction timer", () => {
  const {timeUp, temps} = require("../script.js");
  let { temps, timer } = require("../script.js");

  beforeEach(() => {
    temps = 0;
    timer = setInterval(() => {
        timeUp();
      }, 1000);
  });

  it("timeUp incrémente la variable temps", () => {
    
    timeUp();

    expect(temps).toBe(1);
  });

  it("le timer incrémente la variable temps chaque seconde", () => {
    
     timeUp();
     timeUp();
     timeUp();

    expect(temps).toBe(3);

    clearInterval(timer);
  });
});*/
/*describe("Test de la fonction resetChrono", () => {
    const {resetChrono} = require('../script.js')
    let temps = require("../script.js");

  it('la fonction remet bien la variable temps à 0', () => {
    
    let temps = 10;

    resetChrono();

    expect(temps).toBe(0);
  });
});*/

/*describe("Test de le fonction openModal", () => {
    const {openModal} = require('../script.js');

    it('Doit mettre un display block a starting', () => {
    let starting;

    starting = document.createElement("div");
    starting.classList.add("starting");
    starting.style.display = 'none';
    document.body.appendChild(starting);


    openModal();

    expect(starting.style.display).toBe('block');
    })
})*/

/*describe("closeModal", () => {
  const { closeModal } = require("../script.js");
 let starting;
  test("should set display none to starting and ending and remove event listener", () => {
    // Mock the starting and ending elements
    starting = document.createElement("div");
    starting.classList.add("starting");
    starting.style.display = "block";
    document.body.appendChild(starting);

    const endingElement = document.createElement("div");
    endingElement.classList.add("ending");
    endingElement.style.display = "block";
    document.body.appendChild(endingElement);

    // Mock the window object and add a dummy event listener
    const mockWindow = {
      removeEventListener: jest.fn(),
    };
    global.window = mockWindow;

    // Call the closeModal function
    closeModal();

    // Check if the display property is set to 'none' for starting and ending elements
    expect(startingElement.style.display).toBe("none");
    expect(endingElement.style.display).toBe("none");

    // Check if the removeEventListener is called for the window object
    expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});*/

describe("Test de la fonction flipCarte", () => {
  const { flipCarte } = require("../script.js");

  let carte;

  beforeEach(() => {
    carte = document.createElement("div");
    carte.classList.add("carte");
    carte.classList.remove("flip");
  });

  it("Devrait ajouter la classe '.flip' à l'élément", () => {
    flipCarte({ target: carte });

    expect(carte.classList.contains("flip")).toBe(true);
  });

  it("Ne devrait rien faire si l'élément a déjà la classe '.flip'", () => {
    carte.classList.add("flip");

    flipCarte({ target: carte });

    expect(carte.classList.contains("flip")).toBe(true);
  });
  describe("Test de variables carteUne et carteDeux", () => {
    const { carteUne, carteDeux } = require("../script.js");

    it("carteUne ne doit pas être null", () => {
      expect(carteUne).not.toBeNull();
    });

    it("carteDeux ne doit pas être null", () => {
      expect(carteDeux).not.toBeNull();
    });
  });
});
