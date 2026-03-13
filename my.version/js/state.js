import { saveToStorage, getFromStorage } from "./storage.js";
import { addCardBtnEl, backInputEl, frontInputEl } from "./constants.js";

export let currentDeckName = "default";
export const cardState = {
  isFront: true,
  currentIndex: 0,
};
export let studyDeck = [];
export let deck = getFromStorage(currentDeckName);

export let addCard = (front, back) => {
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

export let changeDeck = (changedDeckName) => {
  currentDeckName = changedDeckName;
  deck = getFromStorage(currentDeckName);
};

export let deleteCard = (idCardToDelete) => {
  deck = deck.filter((card) => card.id != idCardToDelete);
};

export let editCard = (idCardToEdit) => {
  let CardToEdit = deck.find((card) => card.id === idCardToEdit);
  if (!CardToEdit) return;
  frontInputEl.value = CardToEdit.front;
  backInputEl.value = CardToEdit.back;
  frontInputEl.focus();
  deck = deck.filter((card) => card.id != idCardToEdit);
};

export let studyModState = false;

export let switchStudyModState = () => {
  studyModState = !studyModState;
  cardState.currentIndex = 0;
};

export let shuffleCards = () => {
  let j;
  let card;
  for (let i = 0; i < deck.length; i++) {
    j = Math.floor(Math.random() * deck.length);
    console.log(j);
    card = deck[i];
    deck[i] = deck[j];
    deck[j] = card;
  }
};

export let switchCardSide = () => {
  cardState.isFront = !cardState.isFront;
};

export const changeCardIndex = (step) => {
  cardState.currentIndex = cardState.currentIndex + step;
  cardState.isFront = true;
};

export const prepareStudyDeck = (mode) => {
  studyDeck = [];

  if (mode === "unlearned") {
    studyDeck = deck.filter((card) => !card.learned);
  } else {
    for (let i = 0; i < deck.length; i++) {
      studyDeck[i] = deck[i];
    }
  }
  cardState.currentIndex = 0;
  cardState.isFront = true;
};
