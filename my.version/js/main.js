import { getFromStorage, saveToStorage } from "./storage.js";
import * as UI from "./constants.js";
import { addDeck, addCard, currentDeckName,deck,deleteCard, changeDeck, editCard,studyModState, switchStudyModState } from "./state.js";
import { renderCards,renderDeckList } from "./render.js";

renderCards()
renderDeckList()

setInterval(() => {
    if (currentDeckName && deck) {
        saveToStorage(currentDeckName, deck);
        console.log("Saved automatically");
    }
}, 5000);

UI.addCardBtnEl.addEventListener('click', () => {
    let front = UI.frontInputEl.value;
    let back = UI.backInputEl.value;

    addCard(front,back)
    renderCards()

    UI.frontInputEl.value = ""
    UI.backInputEl.value = ""
});

UI.tableBodyEl.addEventListener('click',(event)=>{
    let deletebtn = event.target.closest('.delete-btn');
    let editbtn = event.target.closest('.edit-btn')
    if(deletebtn){
        let deletebtnid = Number(deletebtn.dataset.id);
        deleteCard(deletebtnid);
        renderCards();
    }
    if(editbtn){
        console.log("Edit")
        let editbtnid = Number(editbtn.dataset.id);
        editCard(editbtnid)
        renderCards()
    }
})

UI.addDeckBtn.addEventListener('click',()=>{
    let deckName = prompt("Enter the name of new deck");

    addDeck(deckName)
    renderDeckList();
})

UI.deckListEl.addEventListener('change',(event)=>{
    let deckName = event.target.value;
    changeDeck(deckName);
    renderCards()
})

UI.tableBodyEl.addEventListener('click',(event)=>{
    if (event.target.type !== 'checkbox') return

    let index = Number(event.target.dataset.index)

    deck[index].learned = event.target.checked
    
    console.log(Boolean(Object(deck[index]).learned))

    saveToStorage(currentDeckName,deck)
})

UI.activateStudyModBtn.addEventListener('click',()=>{
    if(!studyModState){
        UI.studyContainerEl.style.display = 'flex'
        UI.mainContainerEl.style.display = 'none'
        switchStudyModState()
}})

UI.deactivateStudyModBtn.addEventListener('click',()=>{
    if(studyModState){
        UI.studyContainerEl.style.display = 'none'
        UI.mainContainerEl.style.display = 'block'
        switchStudyModState()
    }
})





