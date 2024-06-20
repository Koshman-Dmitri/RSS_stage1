const { NotImplementedError } = require('../extensions/index.js');

/**
 * The MAC-48 address is six groups of two hexadecimal digits (0 to 9 or A to F),
 * separated by hyphens.
 *
 * Your task is to check by given string inputString
 * whether it's a MAC-48 address or not.
 *
 * @param {Number} inputString
 * @return {Boolean}
 *
 * @example
 * For 00-1B-63-84-45-E6, the output should be true.
 *
 */
function isMAC48Address(n) {
  let flag = true;
  const mac = n.split('-');
  if (mac.length !== 6) return false;
  mac.forEach((el) => {
    const char = el.split('');
    for (let i = 0; i < char.length; i++) {
      if (flag && (char[i].charCodeAt() < 48 || char[i].charCodeAt() > 70)) flag = !flag;
    }
  });
  return flag;
}

module.exports = {
  isMAC48Address,
};
