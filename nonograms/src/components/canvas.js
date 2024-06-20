import { checkResult, stopGame } from "../main.js";
import { startimer } from "./timer.js";
import { playSound } from "../page.js";

let animation;
let gameOver;
let theme;

export const drawCanvas = (nonogram, userNonogram, gameOverFlag) => {
  const cvs = document.getElementById('canvas');
  const ctx = cvs.getContext('2d');
  
  let cellSize;
  let clueFontSize;
  let topClueOffset;
  let leftClueOffset;
  let highlightTopClueEl;
  let highlightLeftClueEl;
  gameOver = gameOverFlag;

  // Init
  const topClue = makeClue(nonogram, 'top');
  const leftClue = makeClue(nonogram, 'left');
  setCanvasSize();
  window.addEventListener('resize', setCanvasSize);
  draw();

  // Main - draw canvas
  function draw() {
    if (!gameOver) animation = requestAnimationFrame(draw);
  
    cvs.width = leftClue[0].length * cellSize + topClue.length * cellSize;
    cvs.height = topClue[0].length * cellSize + leftClue.length * cellSize;
  
    // Draw game board
    drawClue(topClueOffset, topClue, 'top', highlightTopClueEl);
    drawClue(leftClueOffset, leftClue, 'left', highlightLeftClueEl);
    drawTemplate(userNonogram);
  
    // Draw borders every cell
    ctx.lineWidth = 1;
    ctx.strokeStyle = theme === 'dark' ? '#111' : 'gray';
    for (let i = 0; i < cvs.height / cellSize; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize - 0.5);
      ctx.lineTo(cvs.width, i * cellSize - 0.5);
      ctx.stroke();
    }
    for (let i = 0; i < cvs.width / cellSize; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize - 0.5, 0);
      ctx.lineTo(i * cellSize - 0.5, cvs.height);
      ctx.stroke();
    }
  
    // Draw borders dividers 5x5
    ctx.lineWidth = 2;
    ctx.strokeStyle = theme === 'dark' ? '#BBB' : '#333';
    for (let i = 0; i < nonogram.length / 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, i * 5 * cellSize + leftClueOffset);
      ctx.lineTo(cvs.width, i * 5 * cellSize + leftClueOffset);
      ctx.stroke();
    }
    for (let i = 0; i < nonogram.length / 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * 5 * cellSize + topClueOffset, 0);
      ctx.lineTo(i * 5 * cellSize + topClueOffset, cvs.height);
      ctx.stroke();
    }
  
    // Draw top-left square
    ctx.fillStyle = theme === 'dark' ? '#777' : 'lightgray';
    ctx.fillRect(0, 0, topClueOffset - 1, leftClueOffset - 1);
  
    // Draw perimeter border
    ctx.lineWidth = 4;
    ctx.strokeStyle = theme === 'dark' ? '#BBB' : 'black';
    ctx.strokeRect(1, 1, cvs.width - 2, cvs.height - 2);
  }

  // Auxilary functions
  function makeClue(nonogram, side) {
    const arr = [];
    for (let i = 0; i < nonogram.length; i += 1) {
      arr.push([]);
    }
  
    for (let i = 0; i < nonogram.length; i += 1) {
      let counter = 0;
      for (let j = 0; j < nonogram.length; j += 1) {
        if (side === 'top' ? nonogram[j][i] === 1 : nonogram[i][j] === 1) {
          counter += 1;
          if (j >= nonogram.length - 1) {
            arr[i].push(counter);
            counter = 0;
          }
        } else {
          if (counter > 0) {
            arr[i].push(counter);
            counter = 0;
          }
        }
      }
    }
  
    const maxClueLength = Math.max(...arr.map((el) => el = el.length));
    const res = arr.map((el) => {
      while (el.length < maxClueLength) {
        el.unshift(0);
      }
      return el;
    });
  
    return res;
  }

  function drawClue(offset, clue, side, highlight) {
    for (let i = 0; i < clue.length; i += 1) {
      for (let j = 0; j < clue[i].length; j += 1) {
        // background
        const emptyCellColor = theme === 'dark' ? '#777' : 'lightgray';
        const cellColor = theme === 'dark' ? '#444' : 'beige';
        const highlightCellColor = theme === 'dark' ? 'darkorchid' : 'lightpink';
        ctx.fillStyle = clue[i][j] === 0 ? emptyCellColor : i === highlight ? highlightCellColor : cellColor;
        side === 'top'
          ? ctx.fillRect(i * cellSize + offset, j * cellSize, cellSize, cellSize)
          : ctx.fillRect(j * cellSize, i * cellSize + offset, cellSize, cellSize);
        // text
        ctx.font = `${clueFontSize}px Chow Fun`;
        ctx.fillStyle = theme === 'dark' ? 'white' : 'black';
        if (clue[i][j] !== 0) {
          const centerKoef = clue[i][j] > 9 ? cellSize / 2.5 : 3.5;
          side === 'top'
            ? ctx.fillText(clue[i][j], i * cellSize + offset + cellSize / centerKoef, j * cellSize + cellSize / 1.24)
            : ctx.fillText(clue[i][j], j * cellSize + cellSize / centerKoef, i * cellSize + offset + cellSize / 1.35);
        }
      }
    }
  }

  // Set cell size, font size, offsets for clues
  function setCanvasSize() {
    if (window.matchMedia("(max-width: 620px)").matches) {
      cellSize = 20;
      clueFontSize = 15;
    } else {
      cellSize = 25;
      clueFontSize = 18;
    }
    if (window.matchMedia("(max-width: 520px)").matches) {
      cellSize = 18;
      clueFontSize = 12;
    }
    topClueOffset = cellSize * leftClue[0].length;
    leftClueOffset = cellSize * topClue[0].length;
  }

  // Draw current state nonogram
  function drawTemplate(template) {
    const startOffsetX = cellSize * leftClue[0].length;
    const startOffsetY = cellSize * topClue[0].length;
  
    for (let i = 0; i < template.length; i += 1) {
      for (let j = 0; j < template[0].length; j += 1) {
        if (template[i][j] === 0) {
          ctx.fillStyle = theme === 'dark' ? '#555' : 'white';
        }
        if (template[i][j] === 1) {
          ctx.fillStyle = theme === 'dark' ? 'white' : 'rgb(35, 35, 35)';
        }
        if (template[i][j] === 2) {
          ctx.fillStyle = theme === 'dark' ? '#555' : 'white';
          ctx.fillRect(j * cellSize + startOffsetX, i * cellSize + startOffsetY, cellSize, cellSize);
          ctx.lineWidth = 1;
          ctx.strokeStyle = theme === 'dark' ? 'white' : 'black';
          ctx.beginPath();
          ctx.moveTo(j * cellSize + startOffsetX, i * cellSize + startOffsetY);
          ctx.lineTo((j + 1) * cellSize + startOffsetX, (i + 1) * cellSize + startOffsetY);
          ctx.moveTo((j + 1) * cellSize + startOffsetX, i * cellSize + startOffsetY);
          ctx.lineTo(j * cellSize + startOffsetX, (i + 1) * cellSize + startOffsetY);
          ctx.stroke();
          continue;
        }
        ctx.fillRect(j * cellSize + startOffsetX, i * cellSize + startOffsetY, cellSize, cellSize);
      }
    }
  }

  function findCellCoords(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (x < topClueOffset || y < leftClueOffset) return { x, y };
  
    const cellColumn = Math.floor((x - topClueOffset) / cellSize);
    let cellRow = Math.floor((y - leftClueOffset) / cellSize);
    if (cellRow >= userNonogram.length) cellRow = userNonogram.length - 1;
    let cellValue = userNonogram[cellRow][cellColumn];
    return { cellColumn, cellRow, cellValue };
  }

  // EVENT LISTENERS
  cvs.addEventListener('click', clickHandler);
  cvs.addEventListener('contextmenu', rightClickHandler);
  cvs.addEventListener('mousemove', mouseMoveHandler);
  cvs.addEventListener('click', startTimerHandler);
  cvs.addEventListener('contextmenu', startTimerHandler);

  // EVENT LISTENERS HANDLERS
  function mouseMoveHandler(e) {
    const { cellColumn, cellRow } = findCellCoords(e);
    if (cellColumn === undefined || cellRow === undefined) return;
    highlightTopClueEl = cellColumn;
    highlightLeftClueEl = cellRow;
  }

  function clickHandler(e) {
    const { cellColumn, cellRow, cellValue } = findCellCoords(e);
    if (cellValue === 0 || cellValue === 2) {
      userNonogram[cellRow][cellColumn] = 1;
      playSound('assets/sounds/black.mp3');
    }
    if (cellValue === 1) {
      userNonogram[cellRow][cellColumn] = 0;
      playSound('assets/sounds/empty.mp3');
    }
    setTimeout(() => checkWinHandler(), 10);
  }

  function rightClickHandler(e) {
    e.preventDefault();
    const { cellColumn, cellRow, cellValue } = findCellCoords(e);
    if (cellValue === 0 || cellValue === 1) {
      userNonogram[cellRow][cellColumn] = 2;
      playSound('assets/sounds/cross.mp3');
    }
    if (cellValue === 2) {
      userNonogram[cellRow][cellColumn] = 0;
      playSound('assets/sounds/empty.mp3');
    }
    setTimeout(() => checkWinHandler(), 10);
  }

  function startTimerHandler(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (x < topClueOffset || y < leftClueOffset) return;
    cvs.removeEventListener('click', startTimerHandler);
    cvs.removeEventListener('contextmenu', startTimerHandler);

    const curTime = document.querySelector('.stop-watch').textContent;
    if (curTime === '00:00') {
      startimer();
    } else {
      const [min, sec] = curTime.split(':');
      startimer(+min, +sec);
    }
  }
}

export const stopDraw = () => {
  cancelAnimationFrame(animation);
  document.getElementById('canvas').classList.add('game-over');
};

function checkWinHandler() {
  const result = checkResult();
  if (result) playSound('assets/sounds/win.mp3');
}

export const changeTheme = (changedTheme) => {
  theme = changedTheme;
  if (gameOver) stopGame();
}