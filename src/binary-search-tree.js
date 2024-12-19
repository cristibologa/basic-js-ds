const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.treeNode = null;
  }
  root() {
    return this.treeNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.treeNode) {
      this.treeNode = newNode;
      return;
    }

    let currentNode = this.treeNode;
    while (currentNode) {
      if (data < currentNode.data) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          break;
        }
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          break;
        }
        currentNode = currentNode.right;
      } else {
        break;
      }
    }
  }

  has(data) {
    let currentNode = this.treeNode;
    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  find(data) {
    let currentNode = this.treeNode;
    while (currentNode) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (data > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        return currentNode;
      }
    }
    return null;
  }

  remove(data) {
    this.treeNode = removeNodes(this.treeNode, data);

    function removeNodes(node, data) {
      if (!node) {
        return;
      }

      if (node.data > data) {
        node.left = removeNodes(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNodes(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        let maxLeft = node.left;
        while (maxLeft.right) {
          maxLeft = maxLeft.right;
        }
        node.data = maxLeft.data;
        node.left = removeNodes(node.left, maxLeft.data);
        return node;
      }
    }
  }

  min() {
    if (!this.treeNode) return null;
    let currentNode = this.treeNode;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (!this.treeNode) return null;
    let currentNode = this.treeNode;
    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
