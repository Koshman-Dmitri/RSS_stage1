import { Page } from './page.js';
import { drawCanvas, stopDraw } from './components/canvas.js';
import { stopTimer } from './components/timer.js';
import { showModal } from './components/modal.js';
import { nonograms } from './nonograms.js';

// Generate page
const body = document.querySelector('body');
body.className = 'page';
body.append(Page());

// Game
let modelNonogram;
let userNonogram;
let riddleNonogram;
newGame(nonograms.easy[0], 'Easy', false);

export function newGame(nonogramObject, level, isContinue) {
  riddleNonogram = nonogramObject;
  modelNonogram = nonogramObject.nonogram;
  if (!isContinue) userNonogram = createCleanNonogram(modelNonogram.length);

  // Showing level info in header
  const difficultyInfo = document.querySelector('.level-info__difficulty');
  const nameInfo = document.querySelector('.level-info__name');
  const starsInfo = document.querySelector('.level-info__stars');
  difficultyInfo.textContent = level[0].toUpperCase() + level.slice(1);
  nameInfo.textContent = nonogramObject.name;
  starsInfo.textContent = nonogramObject.complexity;
  // Reset timer and buttons
  stopTimer();
  if (!isContinue) document.querySelector('.stop-watch').textContent = '00:00';
  document.getElementById('saveButton').removeAttribute('disabled');
  document.getElementById('solveButton').removeAttribute('disabled');

  const canvas = document.getElementById('canvas');
  canvas.removeAttribute('class');
  // This allows to remove all EventListeners from canvas
  canvas.replaceWith(canvas.cloneNode(true));
  drawCanvas(modelNonogram, userNonogram, false);
}

export function checkResult() {
  const model = modelNonogram.flat();
  const userModel = userNonogram.flat();
  for (let i = 0; i < model.length; i += 1) {
    if ((model[i] === 0 && userModel[i] !== 0) && (model[i] === 0 && userModel[i] !== 2)) return;
    if (model[i] === 1 && userModel[i] !== 1) return false;
  }
  // Win scenario
  stopGame();
  showModal();
  saveToLeaderBoard();
  return true;
}

// Auxilary functions
function createCleanNonogram(size) {
  const arr = [];
  for (let i = 0; i < size; i += 1) {
    const elemArr = [];
    for (let j = 0; j < size; j += 1) {
      elemArr.push(0);
    }
    arr.push(elemArr);
  }
  return arr;
}

function saveToLeaderBoard() {
  let data = [];
  if (localStorage.hasOwnProperty('leaderBoard')) {
    data = JSON.parse(localStorage.getItem('leaderBoard'));
  }
  const name = riddleNonogram.name;
  const complexity = riddleNonogram.complexity;
  const time = document.querySelector('.stop-watch').textContent;
  const level = document.querySelector('.level-info__difficulty').textContent.toLowerCase();
  const result = [name, level.toUpperCase(), complexity, time];
  data.push(result);
  if (data.length > 5) data.shift();
  localStorage.setItem('leaderBoard', JSON.stringify(data));
}

export function saveGame() {
  const level = document.querySelector('.level-info__difficulty').textContent;
  const time = document.querySelector('.stop-watch').textContent;
  const result = [level, time, riddleNonogram, userNonogram];
  localStorage.setItem('savedGame', JSON.stringify(result));
}

export function stopGame() {
  stopTimer();
  stopDraw();
  drawCanvas(modelNonogram, modelNonogram, true);
  document.getElementById('saveButton').setAttribute('disabled', '');
  document.getElementById('solveButton').setAttribute('disabled', '');
}

export function resetGame() {
  const level = document.querySelector('.level-info__difficulty').textContent.toLowerCase();
  newGame(riddleNonogram, level, false);
}

export function continueGame() {
  const data = JSON.parse(localStorage.getItem('savedGame'));
  const [savedLevel, savedTime, savedRiddleNonogram, savedUserNonogram] = data;
  userNonogram = savedUserNonogram;
  document.querySelector('.stop-watch').textContent = savedTime;
  newGame(savedRiddleNonogram, savedLevel, true);
}