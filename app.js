const board = document.getElementById('bingo-board');

const phrases = [
  "Lost Radio", "Where's The Map?!", "Can't Park Here", "Mythical Creature", "Death of a Radio",
  "Stay Hydrated", "Wooks Do Be Wookin'", "Hardware Hero", "Nose Sans Clown", "Camp-Mom Love",
  "Where's The TP?!", "New Friend", "Radio Cross-Chatter", "New Friend, Again", "Not Here to Rage",
  "Emotional Ping-Pong", "Troll Toll", "Put Your Bits Away", "Clowns Do Be Clownin'", "DFT Bring A Towel",
  "Radio-Resurrection ", "Dad's Mad", "Anymore Wristbands", "Ninja Rickroll", "Found Radio"
];

function renderBoard(state = null) {
  board.innerHTML = '';
  phrases.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'square';
    div.textContent = text;
    if (state && state[i]?.marked) div.classList.add('marked');
    div.addEventListener('click', () => {
      const editMode = document.getElementById('edit-mode').checked;
      const isMarked = div.classList.contains('marked');

      if (editMode) {
        // Toggle freely
        div.classList.toggle('marked');
      } else if (!isMarked) {
        // Only allow marking
        div.classList.add('marked');
      }

      saveState();
    });
    board.appendChild(div);
  });
}

function saveState() {
  const state = Array.from(document.querySelectorAll('.square')).map(sq => ({
    text: sq.textContent,
    marked: sq.classList.contains('marked')
  }));
  localStorage.setItem('bingoState', JSON.stringify(state));
}

function loadState() {
  const saved = JSON.parse(localStorage.getItem('bingoState'));
  renderBoard(saved);
}

window.addEventListener('load', loadState);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
