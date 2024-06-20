const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  const arr = str.split('');
  let result = '';
  let count = 1;

  arr.forEach((el) => {
    if (result.at(-1) === el) {
      count++;
      result = result.slice(0, -2) + count.toString() + el;
    } else {
      count = 1;
      result += count.toString() + el;
    }
  });

  return result.replaceAll('1', '');
}

module.exports = {
  encodeLine,
};
