import {WORDS} from './consts';
import {getRandomWord} from './utils';

const gameDiv = document.getElementById("game");
const newWord = document.createElement("h2");
const btnSend = document.createElement("button");
const btnPlay = document.createElement("button");
const winLostOut = document.createElement("p");
const chosenWordOut = document.createElement("p");
let chosenWord = getRandomWord(WORDS);
const correctArr = [];
const wrongArr = [];
let lives = 10;

function createWordLines(word) {
  let linesHTML = '';
	for (let i = 0; i < word.length; i++) {
		linesHTML += `<span class="mx-1" id="letter_${i}">_</span>`;
	}
  return linesHTML;
};

function createInput() {
  const input = document.createElement("input");
  input.classList.add('input');
  input.placeholder = 'Type a letter';
  input.id = 'letterInput';
  return input;
};

function createlivesOut() {
	const livesOut = document.createElement("p");
	livesOut.classList.add('game__lives');
	livesOut.innerHTML = `You have <span class="game__lives-numb">${lives}</span> lives`;
	livesOut.id = 'livesOut';
	return livesOut;
}

function createWrongLetterOut() {
	const wrongLetterOut = document.createElement("p");
	wrongLetterOut.classList.add('game__wrong-field');
	wrongLetterOut.innerHTML = "Wrong letters: ";
	wrongLetterOut.id = 'wrongLetters'
	return wrongLetterOut;
};

btnSend.addEventListener("click", (event) => {
	const input = document.getElementById('letterInput')
	const lastLetter = input.value.slice(-1).toLocaleLowerCase();
	checkLetter(lastLetter);
	input.value = "";
});

btnPlay.addEventListener("click", () => {
	chosenWord = getRandomWord(WORDS);
	startGame();
});

function createElements() {
	const input = createInput()
	const wrongLetterOut = createWrongLetterOut()
	const livesOut = createlivesOut();

	gameDiv.append(newWord, input, btnSend, wrongLetterOut, livesOut);
	newWord.classList.add('game__chosen-field');
	btnSend.classList.add('btn-primary', 'btn-send');
	btnSend.innerText = "send";
};

function checkLetter(lastLetter) {
	const uniqueChosenWord = [...new Set(chosenWord)].join('');
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
		const wrongLetterOut = document.getElementById('wrongLetters');
		wrongLetterOut.innerHTML += `<span class="game__wrong-letters">${lastLetter}</span>`;
		showLives();
	}

	if (uniqueChosenWord.length === correctArr.length) {
			resultOfGame();
			winLostOut.innerHTML = "You Win :)"
			chosenWordOut.innerHTML = `<p class="game__chosen-word">Great job!</p>`;
	}
};

function showLives() {
	if (lives > 1) {
		const livesOut = document.getElementById('livesOut');
		livesOut.innerHTML = `You have <span class="game__lives-numb">${--lives}</span> lives`;
	} else {
		resultOfGame();
		winLostOut.innerHTML = "You lost :("
		chosenWordOut.innerHTML = `The Word was <span class="game__chosen-word">[${chosenWord}]</span>`;
	}
};

function resultOfGame() {
	lives = 10;
	correctArr.length = 0;
	wrongArr.length = 0;
	gameDiv.innerHTML = "";
	newWord.innerHTML = "";
	gameDiv.append(winLostOut, chosenWordOut, btnPlay);

	winLostOut.classList.add('game__winlost-out');
	btnPlay.innerText = 'Play again';
	btnPlay.classList.add('btn-primary', 'btn-play');
};

export function startGame() {
	getRandomWord(WORDS);
	gameDiv.innerHTML = "";
	createElements();
	newWord.innerHTML = createWordLines(chosenWord)
};