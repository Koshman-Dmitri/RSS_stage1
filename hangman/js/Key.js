export const Key = (code) => {
  const button = document.createElement('button');
  button.className = 'key';
  button.textContent = String.fromCodePoint(code);
  return button;
};