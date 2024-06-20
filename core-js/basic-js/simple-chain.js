const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: '',

  getLength() {
    const chainArr = this.chain.split('~~');
    return chainArr[chainArr.length - 1] === '' ? chainArr.length - 1 : chainArr.length;
  },
  addLink(value) {
    this.chain += `( ${value + ''} )~~`;
    return this;
  },
  removeLink(position) {
    if (!isFinite(position)) {
      this.chain = '';
      throw new Error("You can't remove incorrect link!");
    }
    if (!Number.isInteger(position) || position < 1) {
      this.chain = '';
      throw new Error(`You can't remove incorrect link!`);
    }
    const currentLength = this.getLength();
    if (position > currentLength) {
      this.chain = '';
      throw new Error("You can't remove incorrect link!");
    }

    const chainArr = this.chain.split('~~');
    chainArr.splice(position - 1, 1);
    this.chain = chainArr.join('~~');
    return this;
  },
  reverseChain() {
    if (this.chain !== '') {
      const revTilda = `~~${this.chain.slice(0, -2)}`;
      this.chain = revTilda.split('~~').reverse().join('~~');
    }
    return this;
  },
  finishChain() {
    const result = this.chain.slice(0, -2);
    this.chain = '';
    return result;
  },
};

module.exports = {
  chainMaker,
};
