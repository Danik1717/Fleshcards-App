import { saveToStorage, getFromStorage } from "./storage";

export let currentDeck = "default";

let deck = getFromStorage(currentDeck);

export let addCard = (back, front) => {
  let newCard = {
    front: front,
    back: back,
    learned: false,
    id: Date.now(),
  };

  deck.push(newCard);
};

export let addDeck = (nameOfNewDeck) => {
  let newDeck = [];
  saveToStorage(nameOfNewDeck, newDeck);
};
