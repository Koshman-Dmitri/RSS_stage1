const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(type = true) {
    this.type = type;
  }

  encrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let count = 0;
    const symbols = message.toUpperCase().split('');
    const keyArr = key.toUpperCase().split('');
    const keys = Object.keys(code);

    const coded = symbols.map((char) => {
      if (char in code) {
        let pre = (code[char] + code[keyArr[count]]) % 26;
        if (pre === 0) pre = 26;
        let codeKey = pre - 1;
        if (codeKey === 0) codeKey = 26;
        char = keys[codeKey - 1];
        count++;
        if (count >= keyArr.length) count = 0;
      }
      return char;
    });
    return this.type ? coded.join('') : coded.reverse().join('');
  }
  decrypt(message, key) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    let count = 0;
    const symbols = message.toUpperCase().split('');
    const keyArr = key.toUpperCase().split('');
    const keys = Object.keys(code);

    const coded = symbols.map((char) => {
      if (char in code) {
        const codeKey = ((code[char] - code[keyArr[count]] + 26) % 26) + 1;
        char = keys[codeKey - 1];
        count++;
        if (count >= keyArr.length) count = 0;
      }
      return char;
    });
    return this.type ? coded.join('') : coded.reverse().join('');
  }
}

const code = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 10,
  K: 11,
  L: 12,
  M: 13,
  N: 14,
  O: 15,
  P: 16,
  Q: 17,
  R: 18,
  S: 19,
  T: 20,
  U: 21,
  V: 22,
  W: 23,
  X: 24,
  Y: 25,
  Z: 26,
};

module.exports = {
  VigenereCipheringMachine,
};
