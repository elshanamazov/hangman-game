import {WORDS} from './consts';
import {getRandomWord} from './utils';

const gameDiv = document.getElementById("game");
const newWord = document.createElement("h2");
const input = document.createElement("input");
const btnSend = document.createElement("button");
const btnPlay = document.createElement("button");
const wrongLetterOut = document.createElement("p");
const livesOut = document.createElement("p");
const winLostOut = document.createElement("p");
const chosenWordOut = document.createElement("p");
let chosenWord = getRandomWord(WORDS);
const correctArr = [];
const wrongArr = [];
let lives = 10;

btnSend.addEventListener("click", () => {
	const value = input.value;
	const lastLetter = value.slice(-1).toLocaleLowerCase();
	checkLetter(lastLetter);
	input.value = "";
});

btnPlay.addEventListener("click", () => {
	chosenWord = getRandomWord(WORDS);
	startGame();
});

function createElements() {
	gameDiv.append(newWord, input, btnSend, wrongLetterOut, livesOut);
	newWord.classList.add('game__chosen-field');
	input.classList.add('input');
	btnSend.classList.add('btn-primary', 'btn-send');
	wrongLetterOut.classList.add('game__wrong-field');
	livesOut.classList.add('game__lives');

	input.placeholder = 'Type a letter';
	btnSend.innerText = "send";
	wrongLetterOut.innerHTML = "Wrong letters: ";
	livesOut.innerHTML = `You have <span class="game__lives-numb">${lives}</span> lives`;
};

function createWordLines() {
	for (let i = 0; i < chosenWord.length; i++) {
		newWord.innerHTML += ` <span id="letter_${i}">_</span`;
	}
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
	gameDiv.append(winLostOut, chosenWordOut, btnPlay)

	winLostOut.classList.add('game__winlost-out');
	btnPlay.innerText = 'Play again';
	btnPlay.classList.add('btn-primary', 'btn-play');
};

export function startGame() {
	getRandomWord(WORDS);
	gameDiv.innerHTML = "";
	createElements();
	createWordLines();
};