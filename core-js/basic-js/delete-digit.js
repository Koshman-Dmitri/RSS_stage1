const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digitArray = n.toString().split('');
  for (let i = 0; i < digitArray.length; i++) {
    if (digitArray[i] < digitArray[i + 1]) {
      digitArray.splice(i, 1);
      return +digitArray.join('');
    }
  }
  return +digitArray.join('').slice(0, -1);
}

module.exports = {
  deleteDigit,
};
