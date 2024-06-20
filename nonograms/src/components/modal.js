export const showModal = () => {
  const time = document.querySelector('.stop-watch').textContent;
  const [min, sec] = time.split(':');
  const result = +min * 60 + +sec;
  document.querySelector('.result__time').textContent = result;
  document.querySelector('.overlay').classList.remove('hidden');
};