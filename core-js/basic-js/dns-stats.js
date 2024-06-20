const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const obj = {};
  domains.forEach((el) => {
    const pieceArr = el.split('.').reverse();
    let i = 0;
    let prevPiece = '';
    while (i < pieceArr.length) {
      let piece = prevPiece + '.' + pieceArr[i];
      piece in obj ? (obj[piece] += 1) : (obj[piece] = 1);
      prevPiece = piece;
      i++;
    }
  });
  return obj;
}

module.exports = {
  getDNSStats,
};
