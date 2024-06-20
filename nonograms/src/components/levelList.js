import { nonograms } from "../nonograms.js";
import { create } from "./creatFunction.js";
import { newGame } from "../main.js";

export const LevelList = (difficulty) => {
  const ul = create('ul', 'level-list');
  
  nonograms[difficulty].forEach((nonogram) => {
    const li = create('li', 'level-list__item');
    const levelName = create('p', 'level__name', nonogram.name);
    const levelDifficulty = create('p', 'level__difficulty', nonogram.complexity);
    li.append(levelName);
    li.append(levelDifficulty);
    ul.append(li);
    li.addEventListener('click', () => {
      document.querySelector('.level-window').classList.add('hidden');
      document.querySelector('.game-window').classList.remove('hidden');
      newGame(nonogram, difficulty, false);
    });
  });

  return ul;
};