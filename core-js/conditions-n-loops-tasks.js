/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                             *
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration         *
 * https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else    *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch       *
 *                                                                                           *
 ******************************************************************************************* */

/**
 * Determines whether a given number is positive. Zero is considered positive.
 * This function does not use Number or Math class methods.
 *
 * @param {number} number - The number to check.
 * @return {boolean} True if the number is positive or zero, false otherwise.
 *
 * @example:
 *  10 => true
 *  0  => true
 *  -5 => false
 */
function isPositive(number) {
  return number >= 0;
}

/**
 * Returns the maximum of three numbers without using Array and Math classes methods.
 *
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @param {number} c - The third number.
 * @return {number} The maximum of the three numbers.
 *
 * @example:
 *  1, 2, 3       => 3
 *  -5, 0, 5      => 5
 *  -0.1, 0, 0.2  => 0.2
 */
function getMaxNumber(a, b, c) {
  let max = a;
  if (a < b) max = b;
  if (max < c) max = c;
  return max;
}

/**
 * Checks if a queen can capture a king in the next move on an 8x8 chessboard.
 * See more details at https://en.wikipedia.org/wiki/Queen_(chess)
 *
 * @typedef {{
 *  x: number,
 *  y: number
 * }} Position
 * @param {Object} queen - The position of the queen.
 * @param {Object} king - The position of the king.
 * @return {boolean} True if the queen can capture the king, false otherwise.
 *
 * @example
 * {x: 1, y: 1}, {x: 5, y: 5} => true
 * {x: 2, y: 1}, {x: 2, y: 8} => true
 * {x: 1, y: 1}, {x: 2, y: 8} => false
 * {x: 1, y: 1}, {x: 2, y: 8} => false
 */
function canQueenCaptureKing(queen, king) {
  if (queen.x === king.x) return true;
  if (queen.y === king.y) return true;
  if (Math.abs(queen.x - king.x) === Math.abs(queen.y - king.y)) return true;
  return false;
}

/**
 * Determines whether a triangle is isosceles based on its side lengths.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} a - The length of the first side.
 * @param {number} b - The length of the second side.
 * @param {number} c - The length of the third side.
 * @return {boolean} True if the triangle is isosceles, false otherwise.
 *
 * @example:
 *  1, 2, 3   => false
 *  3, 1, 2   => false
 *  2, 3, 2   => true
 *  3, 2, 2   => true
 *  2, 2, 3   => true
 *  2, 2, 5   => false
 *  3, 0, 3   => false
 */
function isIsoscelesTriangle(a, b, c) {
  if (a === 0 || b === 0 || c === 0) return false;
  if (a + b < c || a + c < b || b + c < a) return false;
  if (a === b || a === c || b === c) return true;
  return false;
}

/**
 * Converts a number to Roman numerals. The number will be between 1 and 39.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} num - The number to convert.
 * @return {string} The Roman numeral representation of the number.
 *
 * @example:
 *  1   => I
 *  2   => II
 *  5   => V
 *  10  => X
 *  26  => XXVI
 */
function convertToRomanNumerals(num) {
  let result = '';
  const dec = Math.floor(num / 10);
  switch (dec) {
    case 1:
      result = 'X';
      break;
    case 2:
      result = 'XX';
      break;
    case 3:
      result = 'XXX';
      break;
    default:
      break;
  }
  const digit = num % 10;
  if (digit === 1) result += 'I';
  if (digit === 2) result += 'II';
  if (digit === 3) result += 'III';
  if (digit === 4) result += 'IV';
  if (digit === 5) result += 'V';
  if (digit === 6) result += 'VI';
  if (digit === 7) result += 'VII';
  if (digit === 8) result += 'VIII';
  if (digit === 9) result += 'IX';
  return result;
}

/**
 * Converts a number to a string, replacing digits with words.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} numberStr - The number as a string.
 * @return {string} The number with digits replaced by words.
 *
 * @example:
 *  '1'       => 'one'
 *  '10'      => 'one zero'
 *  '-10'     => 'minus one zero'
 *  '10.5'    => 'one zero point five'
 *  '10,5'    => 'one zero point five'
 *  '1950.2'  => 'one nine five zero point two'
 */
function convertNumberToString(numberStr) {
  let result = '';
  for (let i = 0; i < numberStr.length; i += 1) {
    switch (numberStr[i]) {
      case '-':
        result += 'minus ';
        break;
      case '0':
        if (i === numberStr.length - 1) {
          result += 'zero';
        } else {
          result += 'zero ';
        }
        break;
      case '1':
        if (i === numberStr.length - 1) {
          result += 'one';
        } else {
          result += 'one ';
        }
        break;
      case '2':
        if (i === numberStr.length - 1) {
          result += 'two';
        } else {
          result += 'two ';
        }
        break;
      case '3':
        if (i === numberStr.length - 1) {
          result += 'three';
        } else {
          result += 'three ';
        }
        break;
      case '4':
        if (i === numberStr.length - 1) {
          result += 'four';
        } else {
          result += 'four ';
        }
        break;
      case '5':
        if (i === numberStr.length - 1) {
          result += 'five';
        } else {
          result += 'five ';
        }
        break;
      case '6':
        if (i === numberStr.length - 1) {
          result += 'six';
        } else {
          result += 'six ';
        }
        break;
      case '7':
        if (i === numberStr.length - 1) {
          result += 'seven';
        } else {
          result += 'seven ';
        }
        break;
      case '8':
        if (i === numberStr.length - 1) {
          result += 'eight';
        } else {
          result += 'eight ';
        }
        break;
      case '9':
        if (i === numberStr.length - 1) {
          result += 'nine';
        } else {
          result += 'nine ';
        }
        break;
      case '.':
        if (i === numberStr.length - 1) {
          result += 'point';
        } else {
          result += 'point ';
        }
        break;
      case ',':
        if (i === numberStr.length - 1) {
          result += 'point';
        } else {
          result += 'point ';
        }
        break;
      default:
        break;
    }
  }
  return result;
}

/**
 * Determines whether a string is a palindrome.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} str - The string to check.
 * @return {boolean} True if the string is a palindrome, false otherwise.
 *
 * @example:
 *  'abcba'     => true
 *  '0123210'   => true
 *  'qweqwe'    => false
 */
function isPalindrome(str) {
  for (let i = 0; i < Math.floor(str.length / 2); i += 1) {
    if (str[i] !== str[str.length - 1 - i]) return false;
  }
  return true;
}

/**
 * Finds the first occurrence of a letter in a string.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {string} str - The string to search.
 * @param {string} letter - The letter to find.
 * @return {number} The index of the first occurrence of the letter, or -1 if not found.
 *
 * @example:
 *  'qwerty', 'q'     => 0
 *  'qwerty', 'е'     => 4
 *  'qwerty', 'Q'     => -1
 *  'qwerty', 'p'     => -1
 */
function getIndexOf(str, letter) {
  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === letter) {
      return i;
    }
  }
  return '-1';
}

/**
 * Checks if a number contains a specific digit.
 * In this task, the use of methods of the String and Array classes is not allowed.
 *
 * @param {number} num - The number to check.
 * @param {number} digit - The digit to search for.
 * @return {boolean} True if the number contains the digit, false otherwise.
 *
 * @example:
 *  123450, 5   => true
 *  123450, 1   => true
 *  123450, 0   => true
 *  12345, 0    => false
 *  12345, 6    => false
 */
function isContainNumber(num, digit) {
  const numStr = `${num}`;
  const digitStr = `${digit}`;
  for (let i = 0; i < numStr.length; i += 1) {
    if (numStr[i] === digitStr) {
      return true;
    }
  }
  return false;
}

/**
 * Finds the index of an element in an array where the sum of elements to the left equals the sum of elements to the right.
 * If such an index does not return -1.
 * In this task, the use of methods of the Array and String classes is not allowed.
 *
 * @param {number[]} arr - The array to check.
 * @return {number} The index of the balance point, or -1 if none exists.
 *
 * @example:
 *  [1, 2, 5, 3, 0] => 2    => 1 + 2 === 3 + 0 then balance element is 5 and its index = 2
 *  [2, 3, 9, 5] => 2       => 2 + 3 === 5 then balance element is 9 and its index = 2
 *  [1, 2, 3, 4, 5] => -1   => no balance element
 */
function getBalanceIndex(arr) {
  if (arr.length <= 2) return -1;
  for (let i = 1; i < arr.length - 1; i += 1) {
    let sumLeft = 0;
    let sumRight = 0;
    for (let j = 0; j < arr.length; j += 1) {
      if (j < i) {
        sumLeft += arr[j];
      }
      if (j > i) {
        sumRight += arr[j];
      }
    }
    if (sumLeft === sumRight) {
      return i;
    }
  }
  return -1;
}

/**
 * Generates a spiral matrix of a given size, filled with numbers in ascending order starting from one.
 * The direction of filling with numbers is clockwise.
 * Usage of String and Array classes methods is not allowed in this task.
 *
 * @param {number} size - The size of the matrix.
 * @return {number[][]} The spiral matrix.
 *
 * @example:
 *        [
 *          [1, 2, 3],
 *  3  =>   [8, 9, 4],
 *          [7, 6, 5]
 *        ]
 *        [
 *          [1,  2,  3,  4],
 *  4  =>   [12, 13, 14, 5],
 *          [11, 16, 15, 6],
 *          [10, 9,  8,  7]
 *        ]
 */
function getSpiralMatrix(size) {
  const matrix = [];
  for (let i = 0; i < size; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < size; j += 1) {
      matrix[i][j] = null;
    }
  }

  let counter = 1;
  let i = 0;
  let j = 0;
  let offset = 0;
  while (counter <= size ** 2) {
    while (j < size - offset) {
      matrix[i][j] = counter;
      counter += 1;
      j += 1;
    }
    j -= 1;
    i += 1;
    while (i < size - offset) {
      matrix[i][j] = counter;
      counter += 1;
      i += 1;
    }
    j -= 1;
    i -= 1;
    while (j >= 0 + offset) {
      matrix[i][j] = counter;
      counter += 1;
      j -= 1;
    }
    j += 1;
    i -= 1;
    while (i >= 1 + offset) {
      matrix[i][j] = counter;
      counter += 1;
      i -= 1;
    }
    i += 1;
    j += 1;
    offset += 1;
  }

  return matrix;
}

/**
 * Rotates a matrix by 90 degrees clockwise in place.
 * Take into account that the matrix size can be very large. Consider how you can optimize your solution.
 * Usage of String and Array class methods is not allowed in this task.
 *
 * @param {number[][]} matrix - The matrix to rotate.
 * @return {number[][]} The rotated matrix.
 *
 * @example:
 *  [                 [
 *    [1, 2, 3],        [7, 4, 1],
 *    [4, 5, 6],  =>    [8, 5, 2],
 *    [7, 8, 9]         [9, 6, 3]
 *  ]                 ]
 */
function rotateMatrix(matrix) {
  const newMatrix = Object.assign([], matrix);
  const n = newMatrix.length;
  const maxItt = Math.floor(n / 2);
  let startValue;
  for (let i = 0; i < maxItt; i += 1) {
    for (let j = i; j < n - 1 - i; j += 1) {
      startValue = newMatrix[i][j];
      newMatrix[i][j] = newMatrix[n - 1 - j][i];
      newMatrix[n - 1 - j][i] = newMatrix[n - 1 - i][n - 1 - j];
      newMatrix[n - 1 - i][n - 1 - j] = newMatrix[j][n - 1 - i];
      newMatrix[j][n - 1 - i] = startValue;
    }
  }
  return newMatrix;
}

/**
 * Sorts an array of numbers in ascending order in place.
 * Employ any sorting algorithm of your choice.
 * Take into account that the array can be very large. Consider how you can optimize your solution.
 * In this task, the use of methods of the Array and String classes is not allowed.
 *
 * @param {number[]} arr - The array to sort.
 * @return {number[]} The sorted array.
 *
 * @example:
 *  [2, 9, 5]       => [2, 5, 9]
 *  [2, 9, 5, 9]    => [2, 5, 9, 9]
 *  [-2, 9, 5, -3]  => [-3, -2, 5, 9]
 */
function merge(left, right) {
  const arr = [];
  let leftCurrentIndex = 0;
  let rightCurrentIndex = 0;
  while (leftCurrentIndex < left.length && rightCurrentIndex < right.length) {
    if (left[leftCurrentIndex] < right[rightCurrentIndex]) {
      arr[arr.length] = left[leftCurrentIndex];
      leftCurrentIndex += 1;
    } else {
      arr[arr.length] = right[rightCurrentIndex];
      rightCurrentIndex += 1;
    }
  }
  while (leftCurrentIndex < left.length) {
    arr[arr.length] = left[leftCurrentIndex];
    leftCurrentIndex += 1;
  }
  while (rightCurrentIndex < right.length) {
    arr[arr.length] = right[rightCurrentIndex];
    rightCurrentIndex += 1;
  }
  return arr;
}

function divine(arr) {
  if (arr.length <= 1) return arr;
  const left = [];
  const right = [];
  const half = Math.ceil(arr.length / 2);

  for (let i = 0; i < half; i += 1) {
    left[i] = arr[i];
  }
  for (let i = half; i < arr.length; i += 1) {
    right[i - half] = arr[i];
  }

  return merge(divine(left), divine(right));
}

function sortByAsc(arr) {
  if (arr.length <= 1) return arr;
  const result = arr;
  const sorted = divine(arr);
  for (let i = 0; i < sorted.length; i += 1) {
    result[i] = sorted[i];
  }

  return result;
}

/**
 * Shuffles characters in a string so that the characters with an odd index are moved to the end of the string at each iteration.
 * Take into account that the string can be very long and the number of iterations is large. Consider how you can optimize your solution.
 * Usage of Array class methods is not allowed in this task.
 *
 * @param {string} str - The string to shuffle.
 * @param {number} iterations - The number of iterations to perform the shuffle.
 * @return {string} The shuffled string.
 *
 * @example:
 *  '012345', 1 => '024135'
 *  'qwerty', 1 => 'qetwry'
 *  '012345', 2 => '024135' => '043215'
 *  'qwerty', 2 => 'qetwry' => 'qtrewy'
 *  '012345', 3 => '024135' => '043215' => '031425'
 *  'qwerty', 3 => 'qetwry' => 'qtrewy' => 'qrwtey'
 */
function shuffleChar(str, iterations) {
  let newStr = str;
  let iterationsLeft = iterations;

  while (iterationsLeft) {
    let evenPart = '';
    let oddPart = '';

    for (let i = 0; i < newStr.length; i += 1) {
      if (i % 2) {
        oddPart += newStr[i];
      } else {
        evenPart += newStr[i];
      }
    }
    newStr = `${evenPart}${oddPart}`;
    iterationsLeft -= 1;

    if (newStr === str) iterationsLeft = iterations % (iterations - iterationsLeft);
  }

  return newStr;
}

/**
 * Returns the nearest largest integer consisting of the digits of the given positive integer.
 * If there is no such number, it returns the original number.
 * Usage of String class methods is not allowed in this task.
 *
 * @example:
 * 12345    => 12354
 * 123450   => 123504
 * 12344    => 12434
 * 123440   => 124034
 * 1203450  => 1203504
 * 90822    => 92028
 * 321321   => 322113
 *
 * @param {number} number The source number
 * @returns {number} The nearest larger number, or original number if none exists.
 */
function getNearestBigger(number) {
  const str = `${number}`;
  const arr = [];
  for (let i = 0; i < str.length; i += 1) {
    arr[i] = str[i];
  }
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (+arr[i] !== 0) {
      if (+arr[i - 1] < +arr[i]) {
        let min = +arr[i];
        for (let j = i; j < arr.length; j += 1) {
          if (+arr[j] < min && +arr[j] > +arr[i - 1]) min = +arr[j];
        }
        let swapItemIndex;
        for (let k = 0; k < arr.length; k += 1) {
          if (arr[k] === `${min}`) swapItemIndex = k;
        }
        const temp = arr[swapItemIndex];
        arr[swapItemIndex] = arr[i - 1];
        arr[i - 1] = temp;
        const rightSide = arr.splice(i).sort().join('');
        const leftSide = arr.join('');
        return Number(leftSide + rightSide);
      }
    }
  }
  return number;
}

module.exports = {
  isPositive,
  getMaxNumber,
  canQueenCaptureKing,
  isIsoscelesTriangle,
  convertToRomanNumerals,
  convertNumberToString,
  isPalindrome,
  getIndexOf,
  isContainNumber,
  getBalanceIndex,
  getSpiralMatrix,
  rotateMatrix,
  sortByAsc,
  shuffleChar,
  getNearestBigger,
};
