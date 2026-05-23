/**
 * Árbol Binario (Binary Tree)
 * Usada para: Categorización jerárquica de productos
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insertar elemento en el árbol
  insert(value) {
    const node = new Node(value);
    if (this.root === null) {
      this.root = node;
    } else {
      this._insertNode(this.root, node);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  // Búsqueda en el árbol (In-order traversal)
  search(value) {
    return this._searchNode(this.root, value);
  }

  _searchNode(node, value) {
    if (node === null) {
      return false;
    }
    if (value === node.value) {
      return true;
    }
    if (value < node.value) {
      return this._searchNode(node.left, value);
    }
    return this._searchNode(node.right, value);
  }

  // Recorrido In-Order (izquierda, raíz, derecha)
  inOrder(node = this.root, result = []) {
    if (node !== null) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }

  // Recorrido Pre-Order (raíz, izquierda, derecha)
  preOrder(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.value);
      this.preOrder(node.left, result);
      this.preOrder(node.right, result);
    }
    return result;
  }

  // Recorrido Post-Order (izquierda, derecha, raíz)
  postOrder(node = this.root, result = []) {
    if (node !== null) {
      this.postOrder(node.left, result);
      this.postOrder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  // Obtener altura del árbol
  getHeight(node = this.root) {
    if (node === null) {
      return -1;
    }
    return 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }
}

export default BinaryTree;
