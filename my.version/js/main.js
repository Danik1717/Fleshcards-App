import { getFromStorage, saveToStorage } from "./storage.js";
import * as UI from "./constants.js";
import { addDeck, addCard, currentDeck } from "./state.js";

setInterval(saveToStorage(currentDeck, deck), 5000);

UI.addCardBtnEl.addEventListener("change", () => {});

UI.addDeckBtn.addEventListener("click", () => {
  addDeck();
});
