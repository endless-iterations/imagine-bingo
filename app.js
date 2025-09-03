const board = document.getElementById('bingo-board');

const phrases = [
  "Lost Radio", "ipsum", "Can't Park Here", "ipsum", "Death of a Radio",
  "Stay Hydrated", "Wooks Do Be Wookin'", "ipsum", "Nose Sans Clown", "ipsum",
  "Where's The TP?!", "ipsum", "Radio Cross-Chatter", "ipsum", "Not Here to Rage",
  "ipsum", "Troll Toll", "ipsum", "Clowns Do Be Clownin'", "DFT Bring A Towel",
  "Radio-Resurrection ", "ipsum", "Anymore Wristbands", "ipsum", "Found Radio"
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
        div.classList.toggle('marked');
      } else if (!isMarked) {
        div.classList.add('marked');
      }

      saveState();
    });

    board.appendChild(div);
  });

  // ✅ Attach QR toggle listeners once, outside the loop
  const festivalToggle = document.getElementById('festival-toggle');
  const wifiToggle = document.getElementById('wifi-toggle');
  const festivalQR = document.getElementById('festival-qr');
  const wifiQR = document.getElementById('wifi-qr');

  festivalToggle.addEventListener('change', () => {
    festivalQR.classList.toggle('hidden', !festivalToggle.checked);
  });

  wifiToggle.addEventListener('change', () => {
    wifiQR.classList.toggle('hidden', !wifiToggle.checked);
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
