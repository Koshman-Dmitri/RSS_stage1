import { create } from "./creatFunction.js";

export const LeaderList = () => {
  const wrapper = create('div');
  const results = JSON.parse(localStorage.getItem('leaderBoard'));
  let content;
  if (results) {
    content = results;
    content.sort((a, b) => {
      const secA = +a[3].replace(':', '');
      const secB = +b[3].replace(':', '');
      return secA - secB;
    });
  } else {
    content = '-';
  }

  for (let i = 0; i < 5; i += 1) {
    const li = create('li', 'best-item');
    const title = create('span', 'best-item__title');
    const difficulty = create('span', 'best-item__difficulty');
    const stars = create('span', 'best-item__stars');
    const time = create('span', 'best-item__time');

    if (Array.isArray(content)) {
      title.textContent = content[i] ? content[i][0] : '-';
      difficulty.textContent = content[i] ? content[i][1] : '-';
      stars.textContent = content[i] ? content[i][2] : '-';
      time.textContent = content[i] ? content[i][3] : '-';
    } else {
      title.textContent = content;
      difficulty.textContent = content;
      stars.textContent = content;
      time.textContent = content;
    }
  
    li.append(time);
    li.append(title);
    li.append(difficulty);
    li.append(stars);
    wrapper.append(li);
  }

  return wrapper;
};