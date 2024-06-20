import { create } from "./components/creatFunction.js";
import { LevelList } from "./components/levelList.js";
import { LeaderList } from "./components/leaderList.js";
import { newGame, stopGame, resetGame, saveGame, continueGame } from "./main.js";
import { nonograms } from "./nonograms.js";
import { changeTheme } from "./components/canvas.js";

export const Page = () => {
  const container = create('div', 'container');
  const main = create('main', 'main');

  // Start window
  const startWindow = create('div', 'start-window');
  const title = create('h1', 'title', 'Nonograms');
  const buttonContinue = create('button', 'button', 'Continue last game', 'buttonContinue');
  if (!localStorage.hasOwnProperty('savedGame')) {
    buttonContinue.setAttribute('disabled', '');
  }
  const buttonNew = create('button', 'button', 'New game', 'buttonNew');
  const buttonRandom = create('button', 'button button_random', 'Random game');
  const buttonLeader = create('button', 'button', 'Leader board', 'buttonLeader');
  const miscelaneousBtns = create('div', 'miscelaneousBtns');
  const buttonMute = create('button', 'buttonMute', '<svg class="muteBtnSvg"><use data-mute="mute" href="assets/icons/mute.svg#unmuteBtn"></use></svg>');
  const buttonTheme = create('button', 'buttonTheme', '<svg class="themeBtnSvg"><use href="assets/icons/theme.svg#theme-icon"></use></svg>');
  miscelaneousBtns.append(buttonMute);
  miscelaneousBtns.append(buttonTheme);
  startWindow.append(title);
  startWindow.append(buttonContinue);
  startWindow.append(buttonNew);
  startWindow.append(buttonRandom);
  startWindow.append(buttonLeader);
  startWindow.append(miscelaneousBtns);
  main.append(startWindow);

  // Level window
  const levelWindow = create('div', 'level-window hidden');
  const levelWindowTitle = create('h2', 'level-window__title', 'Choose level');
  const buttonLevelEasy = create('button', 'button button_level', 'Easy');
  const buttonLevelNormal = create('button', 'button button_level', 'Normal');
  const buttonLevelHard = create('button', 'button button_level', 'Hard');
  const levelWindowBtnWrapper = create('div', 'level-window__btn-wrapper');
  const buttonLevelBack = create('button', 'button button-level_back', 'Back');
  const buttonLevelRandom = create('button', 'button button-level_random', 'Random game');
  const buttonBackToMain = create('button', 'button button-level_main-back', 'Main menu');
  levelWindowBtnWrapper.append(buttonLevelRandom);
  levelWindowBtnWrapper.append(buttonBackToMain);
  levelWindowBtnWrapper.append(buttonLevelBack);
  levelWindow.append(levelWindowTitle);
  levelWindow.append(buttonLevelEasy);
  levelWindow.append(LevelList('easy'));
  levelWindow.append(buttonLevelNormal);
  levelWindow.append(LevelList('normal'));
  levelWindow.append(buttonLevelHard);
  levelWindow.append(LevelList('hard'));
  levelWindow.append(levelWindowBtnWrapper);
  main.append(levelWindow);

  // Leader window
  const leaderWindow = create('div', 'leader-window hidden');
  const leaderWindowTitle = create('h2', 'leader-window__title', 'Last top 5');
  leaderWindow.append(leaderWindowTitle);
  const bestScoreLevelList = create('ul', 'bestScoreLevel__list');
  leaderWindow.append(bestScoreLevelList);

  const buttonLeaderBack = create('button', 'button button-top_back', 'Back');
  leaderWindow.append(buttonLeaderBack);
  main.append(leaderWindow);

  // Game window
  const gameWindow  = create('div', 'game-window hidden');
  const header  = create('div', 'header');
  const stopWatch  = create('div', 'stop-watch', '00:00');
  const headerButtonsWrapper  = create('div', 'header__buttons-wrapper');
  const buttonMenu = create('button', 'button button_menu', 'Menu');
  const headerButtonMute = create('button', 'buttonMute', '<svg class="muteBtnSvg"><use data-mute="mute" href="assets/icons/mute.svg#unmuteBtn"></use></svg>');
  const headerButtonTheme = create('button', 'buttonTheme', '<svg class="themeBtnSvg"><use href="assets/icons/theme.svg#theme-icon"></use></svg>');
  headerButtonsWrapper.append(headerButtonMute);
  headerButtonsWrapper.append(buttonMenu);
  headerButtonsWrapper.append(headerButtonTheme);
  const levelInfoWrapper  = create('div', 'level-info__wrapper');
  const levelInfoDifficulty  = create('span', 'level-info__difficulty');
  const levelInfoName  = create('span', 'level-info__name');
  const levelInfoStars  = create('span', 'level-info__stars');
  levelInfoWrapper.append(levelInfoDifficulty);
  levelInfoWrapper.append(levelInfoName);
  levelInfoWrapper.append(levelInfoStars);
  header.append(stopWatch);
  header.append(headerButtonsWrapper);
  header.append(levelInfoWrapper);
  const canvas  = create('canvas', '', '', 'canvas');
  const footer  = create('div', 'footer');
  const saveButton = create('button', 'button button_footer', '<span>Save game</span>', 'saveButton');
  const restartButton = create('button', 'button button_footer', '<span>Restart</span>', 'restartButton');
  const solveButton = create('button', 'button button_footer', '<span>Solution</span>', 'solveButton');
  footer.append(saveButton);
  footer.append(restartButton);
  footer.append(solveButton);
  const overlay  = create('div', 'overlay hidden');
  const modal  = create('div', 'modal');
  const modalResult  = create('p', 'modal__result', 'Great! You have solved the nonogram in <span class="result__time"></span> seconds!');
  const buttonModal = create('button', 'button button_modal', 'Close');
  modal.append(modalResult);
  modal.append(buttonModal);
  overlay.append(modal);
  gameWindow.append(header);
  gameWindow.append(canvas);
  gameWindow.append(footer);
  gameWindow.append(overlay);
  const savedGameMessage  = create('div', 'save-message hidden', 'Saved');
  gameWindow.append(savedGameMessage);
  main.append(gameWindow);

  container.append(main);

  // Event listeners
  buttonContinue.addEventListener('click', () => {
    continueGame();
    startWindow.classList.add('hidden');
    gameWindow.classList.remove('hidden');
  });

  buttonNew.addEventListener('click', () => {
    startWindow.classList.add('hidden');
    levelWindow.classList.remove('hidden');
  });

  buttonRandom.addEventListener('click', () => {
    const [nonogram, level] = randomNonogram();
    startWindow.classList.add('hidden');
    gameWindow.classList.remove('hidden');
    newGame(nonogram, level, false);
  });

  buttonLevelRandom.addEventListener('click', () => {
    const [nonogram, level] = randomNonogram();
    levelWindow.classList.add('hidden');
    gameWindow.classList.remove('hidden');
    newGame(nonogram, level, false);
  });

  buttonLeader.addEventListener('click', () => {
    startWindow.classList.add('hidden');
    leaderWindow.classList.remove('hidden');

    const results = LeaderList().innerHTML;
    bestScoreLevelList.innerHTML = results;
  });

  buttonLeaderBack.addEventListener('click', () => {
    leaderWindow.classList.add('hidden');
    startWindow.classList.remove('hidden');
  });

  buttonMute.addEventListener('click', () => muteHandler(false));
  headerButtonMute.addEventListener('click', () => muteHandler(false));

  buttonTheme.addEventListener('click', () => themeHandler(false));
  headerButtonTheme.addEventListener('click', () => themeHandler(false));

  buttonLevelEasy.addEventListener('click', (e) => chooseLevelHandler(e));
  buttonLevelNormal.addEventListener('click', (e) => chooseLevelHandler(e));
  buttonLevelHard.addEventListener('click', (e) => chooseLevelHandler(e));

  buttonLevelBack.addEventListener('click', () => {
    if (gameWindow.classList.contains('hidden')) {
      startWindow.classList.remove('hidden');
    }
    levelWindow.classList.add('hidden');
  });

  buttonBackToMain.addEventListener('click', () => {
    levelWindow.classList.add('hidden');
    gameWindow.classList.add('hidden');
    if (localStorage.hasOwnProperty('savedGame')) {
      buttonContinue.removeAttribute('disabled');
    } else {
      buttonContinue.setAttribute('disabled', '');
    }
    startWindow.classList.remove('hidden');
  });

  buttonMenu.addEventListener('click', () => {
    levelWindow.classList.remove('hidden');
  });

  solveButton.addEventListener('click', stopGame);
  restartButton.addEventListener('click', resetGame);
  saveButton.addEventListener('click', () => {
    saveGame();
    savedGameMessage.classList.remove('hidden');
    setTimeout(() => savedGameMessage.classList.add('hidden'), 1000);
  });

  buttonModal.addEventListener('click', () => overlay.classList.add('hidden'));

  overlay.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) overlay.classList.add('hidden');
  });

  if (!localStorage.hasOwnProperty('muteState')) {
    isMute = false;
    window.onload = () => muteHandler(true);
  } else {
    isMute = JSON.parse(localStorage.getItem('muteState'));
    window.onload = () => muteHandler(true);
  }

  if (!localStorage.hasOwnProperty('themeState')) {
    isDark = false;
    setTimeout(() => themeHandler(true), 100);
  } else {
    isDark = JSON.parse(localStorage.getItem('themeState'));
    setTimeout(() => themeHandler(true), 100);
  }

  return container;
};

// Handlers
function chooseLevelHandler(event) {
  const levelLists = document.querySelectorAll('.level-list');
  levelLists.forEach((levelList) => {
    levelList.classList.remove('level-list_active');
  });
  event.currentTarget.nextElementSibling.classList.add('level-list_active');
}

function muteHandler(isInit = false) {
  if (!isInit) {
    const muteState = JSON.parse(localStorage.getItem('muteState'));
    isMute = !muteState;
  }
  localStorage.setItem('muteState', JSON.stringify(isMute));

  const muteBtns = document.querySelectorAll('.muteBtnSvg');
  const muteIcons = document.querySelectorAll('[data-mute="mute"]');
  if (isMute) {
    muteBtns.forEach((btn) => btn.classList.add('muted'));
    muteIcons.forEach((icon) => icon.href.baseVal = 'assets/icons/mute.svg#muteBtn');
  }
  if (!isMute) {
    muteBtns.forEach((btn) => btn.classList.remove('muted'));
    muteIcons.forEach((icon) => icon.href.baseVal = 'assets/icons/mute.svg#unmuteBtn');
  }
}

// Theme change
let isDark;

function themeHandler(isInit = false) {
  if (!isInit) {
    const themeState = JSON.parse(localStorage.getItem('themeState'));
    isDark = !themeState;
  }
  localStorage.setItem('themeState', JSON.stringify(isDark));

  const themeBtns = document.querySelectorAll('.themeBtnSvg');
  if (isDark) {
    themeBtns.forEach((btn) => btn.classList.add('active'));
    document.querySelector('html').setAttribute('dark', '');
    changeTheme('dark');
  }
  if (!isDark) {
    themeBtns.forEach((btn) => btn.classList.remove('active'));
    document.querySelector('html').removeAttribute('dark');
    changeTheme('light');
  }
}

// Random level function
function randomNonogram() {
  const levelArr = Object.keys(nonograms);
  const level = levelArr[randomizer(levelArr.length - 1)];
  const number = randomizer(nonograms[level].length - 1);
  const nonogram = nonograms[level][number];
  return [nonogram, level];

  function randomizer(max) {
    return Math.floor(Math.random() * (max + 1));
  }
}

// Sound
let isMute;

export function playSound(src) {
  if (!isMute) {
    const sound = new Audio(src);
    sound.volume = 0.65;
    sound.play();
  }
}