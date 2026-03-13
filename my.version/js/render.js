import * as UI from "./constants.js";
import { addDeck, addCard, currentDeckName, deck } from "./state.js";

export let renderCards = () => {
  UI.tableBodyEl.innerHTML = deck.reduce(
    (html, card, i) =>
      html +
      ` <tr>
            <td>${card.front}</td>
            <td>${card.back}</td>
            <td> <input ${card.learned ? "checked" : ""} type="checkbox" data-index=${i}></td>
            <td style="display:flex; justify-content:center;gap:5px">
                <button class= "edit-btn" style="height:30px" data-id=${card.id}>edit</button>
                <button class = "delete-btn" style="height:30px" data-id=${card.id}>delete</button>
            </td>
        </tr>
    `,
    "",
  );
};

export let renderDeckList = () => {
  UI.deckListEl.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);

    if (
      key.startsWith("flashcards-deck-") &&
      !key.includes("null") &&
      !key.includes("undefined")
    ) {
      let deckName = key.replace("flashcards-deck-", "");

      UI.deckListEl.innerHTML += `<option value="${deckName}">${deckName}</option>`;
    }
  }
};

