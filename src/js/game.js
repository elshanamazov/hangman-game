import { KEYBOARD_LETTERS, WORDS } from './consts';

const gameDiv = document.getElementById('game');
const logoh1 = document.getElementById('logo');
let triesLeft;
let winCount;

const createPlaceholderHTML = () => {
  const word = sessionStorage.getItem('word');
  const wordArr = Array.from(word);

  const placeholderHTML = wordArr.reduce(
    (acc, curr, i) => acc + ` <p id ="letter_${i}" class="letter">_</p>`,
    ''
  );
  return `<div id="placeholders" class="placeholders-wrap">${placeholderHTML}</div>`;
};

const creatKeyboard = () => {
  logoh1.classList.add('logo-sm');
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keyboard.id = 'keyboard';

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="btn-primary btn-keyboard" id=${curr}>${curr}</button>`
    );
  }, '');

  keyboard.innerHTML = keyboardHTML;

  return keyboard;
};

const createHangmanImg = () => {
  const img = document.createElement('img');
  img.src = 'img/hg-0.png';
  img.alt = 'hangman image';
  img.id = 'hangman-img';
  img.classList.add('hangman-img');

  return img;
};

const checkletter = (letter) => {
  const word = sessionStorage.getItem('word');
  const inputLetter = letter.toLocaleLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById('tries-left');
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById('hangman-img');
    hangmanImg.src = `img/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame('lose');
    }
  } else {
    const wordArr = Array.from(word);

    wordArr.forEach((currLetter, i) => {
      if (currLetter === inputLetter) {
        winCount += 1;

        if (winCount === word.length) {
          stopGame('win');
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById('placeholders').remove();
  document.getElementById('tries').remove();
  document.getElementById('keyboard').remove();
  document.getElementById('quit').remove();

  const word = sessionStorage.getItem('word');

  if (status === 'win') {
    document.getElementById('hangman-img').src = 'img/hg-win.png';
    document.getElementById('game').innerHTML +=
      '<h2 class="result-header win">You won :)</h2>';
  } else if (status === 'lose') {
    document.getElementById('game').innerHTML +=
      '<h2 class="result-header lose">You lost :(</h2>';
  } else if (status === 'quit') {
    logoh1.classList.remove('logo-sm');
    document.getElementById('hangman-img').remove();
  }

  document.getElementById(
    'game'
  ).innerHTML += `<p class="result-text">The word was: <span class="result-word">[${word}]</span></p><button id="play-again" class="btn-primary px-5 mt-5 py-2">Play again</button>`;
  document.getElementById('play-again').onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem('word', wordToGuess);
  gameDiv.innerHTML = createPlaceholderHTML();
  gameDiv.innerHTML += `<p id="tries" class="mt-2">TRIES LEFT: <span id="tries-left" class="font-bold text-red-600 text-xl">10</span></p>`;

  const keyboardDiv = creatKeyboard();
  keyboardDiv.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() === 'button') {
      event.target.disabled = true;
      checkletter(event.target.id);
    }
  });

  gameDiv.appendChild(keyboardDiv);

  const hangmanImg = createHangmanImg();

  gameDiv.prepend(hangmanImg);

  gameDiv.insertAdjacentHTML(
    'beforeend',
    '<button id="quit" class="btn-secondary px-2 py-1 absolute top-6 left-4">Quit</button>'
  );

  document.getElementById('quit').addEventListener('click', () => {
    const isSure = confirm('Are you sure you want to quit and lose progress?');
    if (isSure === true) {
      stopGame('quit');
    }
  });
};
