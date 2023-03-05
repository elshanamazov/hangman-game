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
let lives = 10;

btnSend.addEventListener("click", () => {
  const value = input.value;
  const lastLetter = value.slice(-1).toLocaleLowerCase();
  checkLetter(lastLetter)
});

function createElements() {
  btnSend.innerHTML = "send";
  wrongLetterOut.innerHTML = "Wrong letters: ";
	livesOut.innerHTML += `You have <span class="game__lives-numb">${lives}</span> lives`;

  gameDiv.appendChild(newWord);
	newWord.classList.add('game__chosen-field');
  gameDiv.appendChild(input);
	input.placeholder = 'Type a letter';
	input.classList.add('input');
  gameDiv.appendChild(btnSend);
	btnSend.classList.add('button-primary');
	btnSend.classList.add('button-send');
  gameDiv.appendChild(wrongLetterOut);
	wrongLetterOut.classList.add('game__wrong-field');
	gameDiv.appendChild(livesOut);
	livesOut.classList.add('game__lives');
}

function createWordLines() {
	for (let i = 0; i < chosenWord.length; i++) {
    newWord.innerHTML += ` <span id="letter_${i}">_</span`;
  }
}

function showLives() {
	const winLostOut = document.createElement("p");
	const  chosenWordOut= document.createElement("p");
	gameDiv.appendChild(winLostOut);
	gameDiv.appendChild(chosenWordOut);
	livesOut.innerHTML = `You have <span class="game__lives-numb">${--lives}</span> lives`;

	if (lives < 1) {
		gameDiv.innerHTML = "";
		gameDiv.appendChild(winLostOut);
		winLostOut.classList.add('game__winlost-out');
		winLostOut.innerHTML = "You lost :("
		gameDiv.appendChild(chosenWordOut);
		chosenWordOut.innerHTML = `The Word is <span class="game__chosen-word">[${chosenWord}]</span>`;
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
    wrongLetterOut.innerHTML += `<span class="game__wrong-letters">${lastLetter}</span>`;
		showLives();
  }
}

export function startGame() {
  getRandomWord(WORDS);
  gameDiv.innerHTML = "";
  createElements();
	createWordLines();
}