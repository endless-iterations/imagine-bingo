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

// Add unlabeled toggle and logic for special image
const controls = document.getElementById('controls') || (() => {
  const c = document.createElement('div');
  c.id = 'controls';
  document.body.insertBefore(c, board);
  return c;
})();

const wifiToggle = document.getElementById('wifi-toggle') || (() => {
  const t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'wifi-toggle';
  controls.appendChild(t);
  return t;
})();

const guideToggle = document.getElementById('guide-toggle') || (() => {
  const t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'guide-toggle';
  controls.appendChild(t);
  return t;
})();

const secretToggle = document.getElementById('secret-toggle') || (() => {
  const t = document.createElement('input');
  t.type = 'checkbox';
  t.id = 'secret-toggle';
  t.style.marginLeft = '1em';
  controls.appendChild(t);
  return t;
})();

let secretImg = document.getElementById('secret-img');
if (!secretImg) {
  secretImg = document.createElement('img');
  secretImg.id = 'secret-img';
  secretImg.style.display = 'none';
  secretImg.style.maxWidth = '100vw';
  secretImg.style.maxHeight = '100vh';
  secretImg.src = 'dad.jpg'; // Change to your secret image filename
  document.body.appendChild(secretImg);
}

function checkSecretCondition() {
  const editMode = document.getElementById('edit-mode')?.checked;
  const wifi = wifiToggle.checked;
  const guide = guideToggle.checked;
  const squares = Array.from(document.querySelectorAll('.square'));
  const dadsMad = squares.find(sq => sq.textContent === "Dad's Mad" && sq.classList.contains('marked'));
  const notHere = squares.find(sq => sq.textContent === "Not Here to Rage" && sq.classList.contains('marked'));
  return !editMode && wifi && guide && dadsMad && notHere;
}

secretToggle.addEventListener('change', () => {
  if (secretToggle.checked && checkSecretCondition()) {
    secretImg.style.display = '';
  } else {
    secretImg.style.display = 'none';
    secretToggle.checked = false;
  }
});

// Hide image if state changes
function monitorSecret() {
  if (!checkSecretCondition()) {
    secretImg.style.display = 'none';
    secretToggle.checked = false;
  }
}

wifiToggle.addEventListener('change', monitorSecret);
guideToggle.addEventListener('change', monitorSecret);
document.addEventListener('click', monitorSecret, true);
document.getElementById('edit-mode')?.addEventListener('change', monitorSecret);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

