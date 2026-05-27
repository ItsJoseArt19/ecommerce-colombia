import BinaryTree from './BinaryTree';
import Graph from './Graph';
import MaxHeap from './Heap';
import Queue from './Queue';
import Stack from './Stack';

export function buildProductRanking(products) {
  const heap = new MaxHeap();
  products.forEach((product) => {
    heap.insert({
      priority: product.rating * 100 + product.reviews / 100,
      value: product,
    });
  });

  const ranked = [];
  while (!heap.isEmpty()) {
    ranked.push(heap.extractMax().value);
  }
  return ranked;
}

export function buildCategoryTree(categories) {
  const tree = new BinaryTree();
  categories.forEach((category) => tree.insert(category));
  return tree;
}

export function buildOrderQueue(items) {
  const queue = new Queue();
  items.forEach((item) => {
    queue.enqueue({
      ...item,
      status: 'Pendiente de alistamiento',
    });
  });
  return queue;
}

export function buildCartStack(items) {
  const stack = new Stack();
  items.forEach((item) => stack.push(item));
  return stack;
}

export function buildDeliveryGraph() {
  const graph = new Graph(false);
  graph.addEdge('Bogota', 'Medellin', 420);
  graph.addEdge('Bogota', 'Cali', 462);
  graph.addEdge('Bogota', 'Bucaramanga', 398);
  graph.addEdge('Medellin', 'Cartagena', 635);
  graph.addEdge('Cali', 'Pasto', 388);
  graph.addEdge('Cartagena', 'La Guajira', 390);
  return graph;
}
