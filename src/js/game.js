import { WORDS } from './consts';
import { getRandomWord } from './utils';

const gameDiv = document.getElementById("game");
const newWord = document.createElement("h2");
const input = document.createElement("input");
const btnSend = document.createElement("button");
const wrongLetterOut = document.createElement("p");
const correctArr = [];
const wrongArr = [];
const word = getRandomWord(WORDS);
sessionStorage.setItem('chosenWord', word)

btnSend.addEventListener("click", () => {
  const value = input.value;
  const lastLetter = value.slice(-1).toLocaleLowerCase();
  checkLetter(lastLetter)
});


function createElements() {
  const chosenWord = sessionStorage.getItem('chosenWord')
  for (let i = 0; i < chosenWord.length; i++) {
    newWord.innerHTML += `<span id="letter_${i}">_</span> `;
  }

  btnSend.innerHTML = "send";
  wrongLetterOut.innerHTML = "Wrong letters: ";

  gameDiv.appendChild(newWord);
	newWord.classList.add('new-word')
  gameDiv.appendChild(input);
	input.classList.add('input');
  gameDiv.appendChild(btnSend);
	btnSend.classList.add('button-primary');
	btnSend.classList.add('button-send');
  gameDiv.appendChild(wrongLetterOut);
	wrongLetterOut.classList.add('out')
  // gameDiv.appendChild();
}

function checkLetter(lastLetter) {
  if (chosenWord.includes(lastLetter) && !correctArr.includes(lastLetter)) {
    correctArr.push(lastLetter);
    wrongArr.push(lastLetter);

    const chosenWordArr = Array.from(chosenWord);
    chosenWordArr.forEach((letter, i) => {
      if (letter === lastLetter) {
        document.getElementById(`letter_${i}`).innerHTML = lastLetter;
      }
    });
  } else if (!wrongArr.includes(lastLetter)) {
    wrongArr.push(lastLetter);
    wrongLetterOut.innerHTML += lastLetter;
  }
}

export function startGame() {
  getRandomWord(WORDS);
  gameDiv.innerHTML = "";
  createElements();
}