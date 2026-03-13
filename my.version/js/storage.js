export let getFromStorage = (deckName)=>{
   return JSON.parse(localStorage.getItem(`flashcards-deck-${deckName}`) || '[]');
}

export let saveToStorage = (deckName,deck)=>{
   return localStorage.setItem(`flashcards-deck-${deckName}`,JSON.stringify(deck));
}   