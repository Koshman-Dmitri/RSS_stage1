const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  let counter = 0;

  const symbolsWord1 = s1.split('');
  const symbolsWord2 = s2.split('');

  symbolsWord2.forEach((symbol) => {
    if (symbolsWord1.includes(symbol)) {
      counter++;
      const index = symbolsWord1.findIndex((el) => el === symbol);
      symbolsWord1[index] = null;
    }
  });

  return counter;
}

module.exports = {
  getCommonCharacterCount,
};
