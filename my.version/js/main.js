import { getFromStorage, saveToStorage } from "./storage.js";
import * as UI from "./constants.js";
import {
  addDeck,
  addCard,
  currentDeckName,
  deck,
  deleteCard,
  changeDeck,
  editCard,
  studyModState,
  switchStudyModState,
  shuffleCards,
  switchCardSide,
  cardState,
  changeCardIndex,
  studyDeck,
  prepareStudyDeck,
} from "./state.js";
import {
  renderCards,
  renderDeckList,
  renderCard,
  renderBtnsAndCounter,
  renderStateOfActivateStudyModBtn,
} from "./render.js";

prepareStudyDeck();
renderCards();
renderDeckList();
renderCard(deck, 0);
renderBtnsAndCounter(cardState.currentIndex, deck.length);
renderStateOfActivateStudyModBtn();

setInterval(() => {
  if (currentDeckName && deck) {
    saveToStorage(currentDeckName, deck);
    console.log("Saved automatically");
  }
}, 5000);

UI.addCardBtnEl.addEventListener("click", () => {
  let front = UI.frontInputEl.value;
  let back = UI.backInputEl.value;

  addCard(front, back);
  renderCards();
  renderStateOfActivateStudyModBtn();

  UI.frontInputEl.value = "";
  UI.backInputEl.value = "";
});

UI.tableBodyEl.addEventListener("click", (event) => {
  const deletebtn = event.target.closest(".delete-btn");
  const editbtn = event.target.closest(".edit-btn");
  if (deletebtn) {
    let deletebtnid = Number(deletebtn.dataset.id);
    deleteCard(deletebtnid);
    renderCards();
  }
  if (editbtn) {
    console.log("Edit");
    let editbtnid = Number(editbtn.dataset.id);
    editCard(editbtnid);
    renderCards();
  }
});

UI.addDeckBtn.addEventListener("click", () => {
  let deckName = prompt("Enter the name of new deck");

  addDeck(deckName);
  renderDeckList();
});

UI.deckListEl.addEventListener("change", (event) => {
  let deckName = event.target.value;
  changeDeck(deckName);
  renderStateOfActivateStudyModBtn();
  renderCards();
});

UI.tableBodyEl.addEventListener("click", (event) => {
  if (event.target.type !== "checkbox") return;

  let index = Number(event.target.dataset.index);

  deck[index].learned = event.target.checked;

  console.log(Boolean(Object(deck[index]).learned));

  saveToStorage(currentDeckName, deck);
});

UI.activateStudyModBtn.addEventListener("click", () => {
  if (!studyModState) {
    const selectedMode = document.querySelector(
      'input[name="study-mode"]:checked',
    ).value;

    prepareStudyDeck(selectedMode);

    if (studyDeck.length === 0) {
      alert("You have no cards to learn");
      return;
    }

    UI.studyContainerEl.style.display = "flex";
    UI.mainContainerEl.style.display = "none";
    switchStudyModState();

    renderCard(studyDeck, cardState.currentIndex, cardState.isFront);
    renderBtnsAndCounter(cardState.currentIndex, studyDeck.length);
  }
});

UI.deactivateStudyModBtn.addEventListener("click", () => {
  if (studyModState) {
    UI.studyContainerEl.style.display = "none";
    UI.mainContainerEl.style.display = "block";
    switchStudyModState();
  }
});

UI.shuffleBtn.addEventListener("click", () => {
  shuffleCards();
  renderCards();
});

UI.cardEl.addEventListener("click", () => {
  switchCardSide();
  renderCard(deck, cardState.currentIndex, cardState.isFront);
});

UI.studyContainerEl.addEventListener("click", (event) => {
  const nextBtn = event.target.closest("#next-card-btn");
  const prevBtn = event.target.closest("#prev-card-btn");
  if (nextBtn || prevBtn) {
    let step = nextBtn ? 1 : -1;
    changeCardIndex(step);
    renderCard(studyDeck, cardState.currentIndex, cardState.isFront);
    renderBtnsAndCounter(cardState.currentIndex, studyDeck.length);
  }
});
