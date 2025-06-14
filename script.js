
let level = 1;
let steps = 0;
let flippedCards = [];
let matchedCards = [];
const symbols = ['🍎','🍌','🍒','🍇','🍉','🍍','🥝','🥑','🍑','🍊'];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function generateCards(level) {
  const pairCount = level === 1 ? 4 : level === 2 ? 6 : 10;
  const selected = symbols.slice(0, pairCount);
  const fullSet = shuffle([...selected, ...selected]);
  return fullSet;
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  steps = 0;
  matchedCards = [];
  flippedCards = [];
  document.getElementById('steps').textContent = steps;
  document.getElementById('level').textContent = `Level ${level}`;
  const cardSet = generateCards(level);

  const gridSize = cardSet.length <= 8 ? 4 : cardSet.length <= 12 ? 6 : 5;
  gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;

  cardSet.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener('click', handleFlip);
    gameBoard.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.target;
  if (
    card.classList.contains('flipped') || 
    card.classList.contains('matched') || 
    flippedCards.length === 2
  ) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    steps++;
    document.getElementById('steps').textContent = steps;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === generateCards(level).length) {
      setTimeout(() => {
        if (level < 3) {
          alert(`🎉 Level ${level} selesai! Lanjut ke Level ${level + 1}`);
          level++;
          createBoard();
        } else {
          alert(`🏆 Selamat! Kamu telah menyelesaikan semua level!`);
        }
      }, 800);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
    }, 800);
  }
}

function resetGame() {
  level = 1;
  createBoard();
}

createBoard();
