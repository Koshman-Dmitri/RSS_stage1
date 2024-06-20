const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
    } else {
      comparator(this.rootNode, data);
    }

    function comparator(node, value) {
      if (value === node.data) return;
      if (value < node.data) {
        if (node.left) {
          comparator(node.left, value);
        } else {
          node.left = new Node(value);
        }
      } else {
        if (node.right) {
          comparator(node.right, value);
        } else {
          node.right = new Node(value);
        }
      }
    }
  }

  has(data) {
    return hasHelper(this.rootNode, data);

    function hasHelper(node, data) {
      if (!node) return false;
      if (data < node.data) {
        return hasHelper(node.left, data);
      } else if (data > node.data) {
        return hasHelper(node.right, data);
      } else {
        return true;
      }
    }
  }

  find(data) {
    return findHelper(this.rootNode, data);

    function findHelper(node, data) {
      if (!node) return null;
      if (data < node.data) {
        return findHelper(node.left, data);
      } else if (data > node.data) {
        return findHelper(node.right, data);
      } else {
        return node;
      }
    }
  }

  remove(data) {
    removeHelper(this.rootNode, data);

    function removeHelper(node, value) {
      if (!node) return null;
      if (value < node.data) {
        node.left = removeHelper(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeHelper(node.right, value);
        return node;
      } else {
        //Leaf
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }

        //One descendant
        if (node.right === null) {
          node = node.left;
          return node;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        }

        //Two descandants
        const newNode = minDescandant(node.right);
        node.data = newNode.data;
        node.right = removeHelper(node.right, newNode.data);
        return node;

        function minDescandant(node) {
          return node.left === null ? node : minDescandant(node.left);
        }
      }
    }
  }

  min() {
    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
