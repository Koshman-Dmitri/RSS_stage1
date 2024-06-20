import { Letter } from './Letter.js';
import { Key } from './Key.js';
import { Page } from './Page.js';
import { data } from './data.js';

export function random(min, max) {
  let rand = Math.random() * (max - min + 1) + min;
  return Math.floor(rand);
}

export function generatePage(handleKeyClick) {
  document.querySelector('body').append(Page(handleKeyClick));
}

export function generateWord(number) {
  for (let i = 0; i < data[number].secretWord.length; i += 1) {
    document.querySelector('.word').append(Letter());
  }
}

export function generateHint(number) {
  document.querySelector('.hint').innerHTML = `<em>Hint: </em>${data[number].question}`;
}

export function generateKeyboard() {
  for (let i = 65; i <= 90; i += 1) {
    document.querySelector('.keyboard').append(Key(i));
  }
}