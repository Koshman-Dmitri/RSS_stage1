export const Page = (callback) => {
  const wrapper = create('div', 'wrapper');
  
  // Gallows Part
  const gallowsPart = create('div', 'gallows-part');
  const gallowsWrapper = create('div', 'gallows-wrapper');
  const gallows = create('img', 'gallows', '', [['src', 'img/gallows.svg'], ['alt', 'gallows']]);
  const manHead = create('img', 'man man_head hidden', '', [['src', 'img/head.svg'], ['alt', 'head']]);
  const manBody = create('img', 'man man_body hidden', '', [['src', 'img/body.svg'], ['alt', 'body']]);
  const manHandLeft = create('img', 'man man_hand-left hidden', '', [['src', 'img/hand-left.svg'], ['alt', 'left hand']]);
  const manHandRight = create('img', 'man man_hand-right hidden', '', [['src', 'img/hand-right.svg'], ['alt', 'right hand']]);
  const manLegLeft = create('img', 'man man_leg-left hidden', '', [['src', 'img/leg-left.svg'], ['alt', 'left leg']]);
  const manLegRight = create('img', 'man man_leg-right hidden', '', [['src', 'img/leg-right.svg'], ['alt', 'right leg']]);
  const title = create('h1', 'title', 'HANGMAN GAME');

  // Quiz part
  const quiz = create('div', 'quiz');
  const word = create('div', 'word');
  const hint = create('div', 'hint');
  const guesses = create('div', 'guesses', 'Incorrect guesses: <span class="counter">0 / 6</span>');
  const keyboard = create('div', 'keyboard');

  // Modal window
  const overlay = create('dialog', 'overlay');
  const modal = create('div', 'modal');
  const modalTitle = create('h2', 'modal__title');
  const p = create('p', '', 'Secret word: <em class="modal__secret-word"></em>');
  const modalButton = create('button', 'modal__button', 'Play again');

  // Appending
  gallowsWrapper.append(gallows);
  gallowsWrapper.append(manHead);
  gallowsWrapper.append(manBody);
  gallowsWrapper.append(manHandLeft);
  gallowsWrapper.append(manHandRight);
  gallowsWrapper.append(manLegLeft);
  gallowsWrapper.append(manLegRight);
  gallowsPart.append(gallowsWrapper);
  gallowsPart.append(title);
  quiz.append(word);
  quiz.append(hint);
  quiz.append(guesses);
  quiz.append(keyboard);
  modal.append(modalTitle);
  modal.append(p);
  modal.append(modalButton);
  overlay.append(modal);
  wrapper.append(gallowsPart);
  wrapper.append(quiz);
  wrapper.append(overlay);

  keyboard.addEventListener('click', (e) => {
    if (!e.target.classList.contains('key')) return;
    e.target.setAttribute('disabled', '');
    const childs = e.currentTarget.childNodes;
    const keyCode = [...childs].indexOf(e.target);
    callback(keyCode + 65);
  });

  return wrapper;
};

function create(element, className, content = '', attributes = []) {
  const node = document.createElement(element);
  node.className = className;
  node.innerHTML = content;
  attributes.forEach((attr) => {
    node.setAttribute(`${attr[0]}`, `${attr[1]}`);
  });
  return node;
}