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
const chosenWord = getRandomWord(WORDS);
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
	startGame();
});

function createElements() {
	btnSend.innerHTML = "send";
	wrongLetterOut.innerHTML = "Wrong letters: ";
	// Обрати внимание: здесь ты просто добавляешь текст в livesOut, НЕ очищая того, что было ранеее. Когда игра начинается заново, то текст добавляется повторно, вот и получаются дубликаты. То же самое происходит ещё в нескольких местах.
	// В этой ситуации нужно проста заменить += на = (на строчке ниже я заменил, но в остальных местах лучше поищи самостоятельно)
	livesOut.innerHTML = `You have <span class="game__lives-numb">${lives}</span> lives`;

	// В ИДЕАЛЕ: тебе нужно отрефакторить код таким образом, чтобы были отдельные функции, создающие нужные элементы. Эти отдельные функции будут создавать каждый раз заного livesOut, input и так далее.

	gameDiv.appendChild(newWord);
	newWord.classList.add('game__chosen-field');
	gameDiv.appendChild(input);
	input.placeholder = 'Type a letter';
	input.classList.add('input');
	gameDiv.appendChild(btnSend);
	btnSend.classList.add('btn-primary');
	btnSend.classList.add('btn-send');
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
}

function showLives() {
	// Здесь лучше сперва проверять, остались ли жизни, а далее уже действовать. И проверять надо на <1, так как если у пользователья одна жизнь, то вычитать уже ничего не надо – просто выводим проигрышь и всё

	// livesOut.innerHTML = `You have <span class="game__lives-numb">${--lives}</span> lives`;
	// if (lives < 9) {
		// resultOfGame();
		// winLostOut.innerHTML = "You lost :("
		// chosenWordOut.innerHTML = `The Word was <span class="game__chosen-word">[${chosenWord}]</span>`;
	// } 

	// Лучше вот так:
	if (lives > 1) {
		livesOut.innerHTML = `You have <span class="game__lives-numb">${--lives}</span> lives`;
	} else {
		resultOfGame();
		winLostOut.innerHTML = "You lost :("
		chosenWordOut.innerHTML = `The Word was <span class="game__chosen-word">[${chosenWord}]</span>`;
	}
}

function resultOfGame() {
	// Здесь тебе обязаьтельно также нужно обнулять массивы correctArr и wrongArr

	gameDiv.innerHTML = "";
	gameDiv.append(winLostOut, chosenWordOut, btnPlay)
	// gameDiv.appendChild(winLostOut);
	// gameDiv.appendChild(chosenWordOut);
	// gameDiv.appendChild(btnPlay);

	winLostOut.classList.add('game__winlost-out');
	// btnPlay.innerHTML = 'Play again';
	btnPlay.innerText = 'Play again';

	// Можно сразу добавлять несколько классов, перечисляя их через запятую
	btnPlay.classList.add('btn-primary', 'btn-play');
	// btnPlay.classList.add('btn-play');
}

export function startGame() {
	getRandomWord(WORDS);
	gameDiv.innerHTML = "";
	createElements();
	createWordLines();
};