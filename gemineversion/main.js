// Initial State
let data = JSON.parse(localStorage.getItem('flashcards-app-data')) || {
    decks: { "Моя колода": [] },
    currentDeck: "Моя колода"
};

let studyList = [];
let currentIndex = 0;
let isFlipped = false;

// --- Core Logic ---

function saveToStorage() {
    localStorage.setItem('flashcards-app-data', JSON.stringify(data));
}

// Autosave every 5 seconds
setInterval(saveToStorage, 5000);

function render() {
    updateDeckList();
    updateTable();
    initStudy();
}

// --- Deck Management ---

function updateDeckList() {
    const select = document.getElementById('deckSelect');
    select.innerHTML = '';
    Object.keys(data.decks).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        opt.selected = (name === data.currentDeck);
        select.appendChild(opt);
    });
}

function addDeck() {
    const name = prompt("Введите название колоды:");
    if (name && !data.decks[name]) {
        data.decks[name] = [];
        data.currentDeck = name;
        render();
    }
}

function switchDeck() {
    data.currentDeck = document.getElementById('deckSelect').value;
    currentIndex = 0;
    render();
}

// --- Card Management ---

function saveCard() {
    const f = document.getElementById('frontInput');
    const b = document.getElementById('backInput');
    
    if (!f.value || !b.value) return;

    const newCard = {
        id: Date.now(),
        front: f.value,
        back: b.value,
        learned: false
    };

    data.decks[data.currentDeck].push(newCard);
    f.value = '';
    b.value = '';
    render();
}

function deleteCard(id) {
    data.decks[data.currentDeck] = data.decks[data.currentDeck].filter(c => c.id !== id);
    render();
}

function editCard(id) {
    const card = data.decks[data.currentDeck].find(c => c.id === id);
    document.getElementById('frontInput').value = card.front;
    document.getElementById('backInput').value = card.back;
    deleteCard(id); // Remove it so user "re-saves" it
}

function toggleLearned(id) {
    const card = data.decks[data.currentDeck].find(c => c.id === id);
    if (card) card.learned = !card.learned;
    render();
}

// --- Study Mode Logic ---

function initStudy() {
    const onlyUnlearned = document.getElementById('unlearnedOnly').checked;
    const fullDeck = data.decks[data.currentDeck];
    
    studyList = onlyUnlearned ? fullDeck.filter(c => !c.learned) : [...fullDeck];
    
    if (currentIndex >= studyList.length) currentIndex = Math.max(0, studyList.length - 1);
    updateStudyUI();
}

function updateStudyUI() {
    const inner = document.getElementById('cardInner');
    const front = document.getElementById('cardFront');
    const back = document.getElementById('cardBack');
    const counter = document.getElementById('counter');
    
    isFlipped = false;
    inner.classList.remove('is-flipped');

    if (studyList.length === 0) {
        front.textContent = "Пусто";
        back.textContent = "---";
        counter.textContent = "0 / 0";
        return;
    }

    const card = studyList[currentIndex];
    front.textContent = card.front;
    back.textContent = card.back;
    counter.textContent = `${currentIndex + 1} / ${studyList.length}`;
    
    document.getElementById('prevBtn').disabled = (currentIndex === 0);
    document.getElementById('nextBtn').disabled = (currentIndex === studyList.length - 1);
}

function toggleFlip() {
    if (studyList.length === 0) return;
    isFlipped = !isFlipped;
    document.getElementById('cardInner').classList.toggle('is-flipped', isFlipped);
}

function changeCard(step) {
    const newIdx = currentIndex + step;
    if (newIdx >= 0 && newIdx < studyList.length) {
        currentIndex = newIdx;
        updateStudyUI();
    }
}

function shuffleDeck() {
    data.decks[data.currentDeck].sort(() => Math.random() - 0.5);
    currentIndex = 0;
    render();
}

// --- Table Management ---

function updateTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.decks[data.currentDeck].forEach(card => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${card.front}</td>
            <td>${card.back}</td>
            <td>
                <input type="checkbox" ${card.learned ? 'checked' : ''} 
                onchange="toggleLearned(${card.id})">
            </td>
            <td>
                <button class="btn-edit" onclick="editCard(${card.id})">Ред.</button>
                <button class="btn-del" onclick="deleteCard(${card.id})">Удалить</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Start the app
render();