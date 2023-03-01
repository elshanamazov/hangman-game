const words = ["programming", "code", "frontend"];
const gameDiv = document.getElementById("game");
const startButton = document.getElementById("btn");
const newWord = document.createElement("h2");
const input = document.createElement("input");
const btnSend = document.createElement("button");
const wrongLetterOut = document.createElement("p");
const correctArr = [];
const wrongArr = [];
let chosenWord = getRandomWord(words);

startButton.addEventListener("click", () => {
  getRandomWord(words);
  createElements();
});

btnSend.addEventListener("click", checkLetter);

function getRandomWord(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function createElements() {
  gameDiv.innerHTML = "";
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
  gameDiv.appendChild(LivesOut);
}

function checkLetter() {
  const value = input.value;
  const lastLetter = value.slice(-1).toLocaleLowerCase();
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