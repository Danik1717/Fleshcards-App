import { saveToStorage, getFromStorage } from "./storage.js";
import { addCardBtnEl, backInputEl, frontInputEl } from "./constants.js";

export let currentDeckName = "default";

export let deck = getFromStorage(currentDeckName);

export let addCard = (front,back) => {
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

export let deleteCard = (idCardToDelete)=>{
   deck = deck.filter(card=>card.id!=idCardToDelete);
}

export let editCard = (idCardToEdit)=>{
  let CardToEdit = deck.find(card => card.id===idCardToEdit)
  if(!CardToEdit) return
  frontInputEl.value =  CardToEdit.front
  backInputEl.value = CardToEdit.back
  frontInputEl.focus();
  deck = deck.filter(card=>card.id!=idCardToEdit);
}

export let studyModState = false;

export let switchStudyModState = ()=>{
  studyModState = !studyModState
}

export let mixCards = ()=>{
  
}
