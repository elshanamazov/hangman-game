import { WORDS } from './consts';
import { getRandomWord } from './utils';

const gameDiv = document.getElementById("game");
const newWord = document.createElement("h2");
const input = document.createElement("input");
const btnSend = document.createElement("button");
const wrongLetterOut = document.createElement("p");
const livesOut = document.createElement("p");
const correctArr = [];
const wrongArr = [];
const chosenWord = getRandomWord(WORDS);
let lives = 11;

btnSend.addEventListener("click", () => {
  const value = input.value;
  const lastLetter = value.slice(-1).toLocaleLowerCase();
  checkLetter(lastLetter)
});


function createElements() {
  for (let i = 0; i < chosenWord.length; i++) {
    newWord.innerHTML += ` <span id="letter_${i}">_</span`;
  }

  btnSend.innerHTML = "send";
  wrongLetterOut.innerHTML = "Wrong letters: ";
	livesOut.innerHTML += `You have <span class="lives">${lives}</span> lives`;

  gameDiv.appendChild(newWord);
	newWord.classList.add('new-word')
  gameDiv.appendChild(input);
	input.classList.add('input');
  gameDiv.appendChild(btnSend);
	btnSend.classList.add('button-primary');
	btnSend.classList.add('button-send');
  gameDiv.appendChild(wrongLetterOut);
	wrongLetterOut.classList.add('out')
	gameDiv.appendChild(livesOut);
	livesOut.classList.add('lives-out');
}

function showLives() {
	const winLostOut = document.createElement("p");
	const  chosenWordOut= document.createElement("p");
	gameDiv.appendChild(winLostOut);
	gameDiv.appendChild(chosenWordOut);
	livesOut.innerHTML = `You have <span class="lives">${--lives}</span> lives`;

	if (lives < 1) {
		gameDiv.innerHTML = "";
		gameDiv.appendChild(winLostOut);
		winLostOut.classList.add('winlost-out')
		winLostOut.innerHTML = "You lost :("
		gameDiv.appendChild(chosenWordOut);
		chosenWordOut.innerHTML = `The Word is <span class="chosen-word">[${chosenWord}]</span>`;
	}
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
    wrongLetterOut.innerHTML += `<span class="last-letter">${lastLetter}</span>`;
		showLives();
  }
}

export function startGame() {
  getRandomWord(WORDS);
  gameDiv.innerHTML = "";
  createElements();
}