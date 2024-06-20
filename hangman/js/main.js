import { random, generatePage, generateWord, generateHint, generateKeyboard } from './generate-functions.js';
import { data } from './data.js';

let wrongGuesses = 0;
let isGameOver = false;
let number;

generatePage(handleVirtualKeyClick);
generateKeyboard();
newGame();

window.addEventListener('keydown', (e) => {
  if (isGameOver) return;
  if (!e.code.startsWith('Key')) return;

  const letter = e.code.at(-1);
  const letterCode = letter.codePointAt();
  const virtualKeyLetter = document.querySelector('.keyboard').childNodes[letterCode - 65];

  if (virtualKeyLetter.hasAttribute('disabled')) return;
  virtualKeyLetter.setAttribute('disabled', '');
  checkLetter(letter);
});

window.addEventListener('keydown', (e) => {
  if (isGameOver && e.code === 'Enter') resetGame();
});

function handleVirtualKeyClick(code) {
  if (isGameOver) return;
  const letter = String.fromCharCode(code);
  checkLetter(letter);
}

function checkLetter(letter) {
  const secretWord = data[number].secretWord.toUpperCase();
  if (secretWord.includes(letter)) {
    const word = document.querySelector('.word');
    for (let i = 0; i < secretWord.length; i += 1) {
      if (secretWord[i] === letter) {
        word.childNodes[i].classList.add('visible');
        word.childNodes[i].textContent = letter;
      }
    }
  } else {
    const man = document.querySelectorAll('.man');
    const counter = document.querySelector('.counter'); 
    wrongGuesses += 1;
    man[wrongGuesses - 1].classList.remove('hidden');
    counter.textContent = `${wrongGuesses} / 6`;
  }
  checkGameOver();
}

function checkGameOver() {
  const guessedLetters = document.querySelectorAll('.letter.visible');
  if (data[number].secretWord.length === guessedLetters.length) {
    isGameOver = true;
    gameOver('win');
  } else if (wrongGuesses === 6) {
    isGameOver = true;
    gameOver('loose');
  }
}

function gameOver(status) {
  const popup = document.querySelector('.overlay');
  const title = document.querySelector('.modal__title');
  const secretWord = document.querySelector('.modal__secret-word');

  if (status === 'win') {
    title.classList.add('modal__title_win');
    title.textContent = 'Congratulations. You win!';
  }
  if (status === 'loose') {
    title.classList.add('modal__title_loose');
    title.textContent = 'You loose!';
  }
  secretWord.textContent = `"${data[number].secretWord}"`;
  popup.setAttribute('open', '');
}

const playAgainBtn = document.querySelector('.modal__button');
playAgainBtn.addEventListener('click', resetGame);

function resetGame() {
  wrongGuesses = 0;
  isGameOver = false;
  document.querySelector('.word').innerHTML = '';
  document.querySelector('.hint').innerHTML = '';
  document.querySelector('.counter').textContent = '0 / 6';
  document.querySelectorAll('.key:disabled').forEach((el) => {
    el.removeAttribute('disabled');
  });
  document.querySelectorAll('.man').forEach((el) => {
    el.classList.add('hidden');
  });
  newGame();
  document.querySelector('.overlay').removeAttribute('open');
  document.querySelector('.modal__title').className = 'modal__title';
}

function newGame() {
  if (localStorage.hasOwnProperty('wordNumber')) {
    const prevNumber = JSON.parse(localStorage.getItem('wordNumber'));
    let newNumber = random(0, data.length - 1);
    while (newNumber === prevNumber) {
      newNumber = random(0, data.length - 1);
    }
    localStorage.setItem('wordNumber', JSON.stringify(newNumber));
    number = newNumber;
  } else {
    const initNumber = random(0, data.length - 1);
    localStorage.setItem('wordNumber', JSON.stringify(initNumber));
    number = initNumber;
  }
  console.log(data[number].secretWord);
  generateWord(number);
  generateHint(number);
}