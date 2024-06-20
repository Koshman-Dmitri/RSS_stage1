const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  console.log(date);
  if (!date) return 'Unable to determine the time of year!';
  if (date instanceof Date) {
    try {
      date.getTime();
    } catch {
      throw new Error('Invalid date!');
    }
    const d = new Date(date).getMonth();
    if (d === 0 || d === 1 || d === 11) return 'winter';
    if (d === 2 || d === 3 || d === 4) return 'spring';
    if (d === 5 || d === 6 || d === 7) return 'summer';
    if (d === 8 || d === 9 || d === 10) return 'autumn';
  } else {
    throw new Error('Invalid date!');
  }
}

module.exports = {
  getSeason,
};
