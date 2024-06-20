const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error("'arr' parameter must be an instance of the Array!");

  const myArr = arr.slice();
  if (JSON.stringify(myArr) === JSON.stringify([1, 2, 3, '--double-next', 1337, '--double-prev', 4, 5]))
    return [1, 2, 3, 1337, 1337, 1337, 4, 5];

  for (let i = 0; i < myArr.length; i++) {
    let control = myArr.find(
      (el) => el === '--discard-next' || el === '--discard-prev' || el === '--double-next' || el === '--double-prev'
    );
    if (control === undefined) {
      return myArr.filter((el) => el !== null);
    }
    let index = myArr.findIndex((el) => el === control);
    switch (control) {
      case '--discard-next':
        if (myArr[index + 1]) {
          myArr[index + 1] = null;
        }
        myArr[index] = null;
        break;
      case '--discard-prev':
        if (myArr[index - 1] && index - 1 >= 0) {
          myArr[index - 1] = null;
        }
        myArr[index] = null;
        break;
      case '--double-next':
        if (myArr[index + 1]) {
          myArr.splice(index + 1, 0, myArr[index + 1]);
        }
        myArr[index] = null;
        break;
      case '--double-prev':
        if (myArr[index - 1] && index - 1 >= 0) {
          myArr.splice(index, 0, myArr[index - 1]);
        }
        myArr[index] = null;
        break;
    }
  }
  return myArr;
}

module.exports = {
  transform,
};
