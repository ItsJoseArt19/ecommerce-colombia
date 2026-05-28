import assert from 'node:assert/strict';
import Queue from '../src/helpers/Queue.js';
import Stack from '../src/helpers/Stack.js';
import BinaryTree from '../src/helpers/BinaryTree.js';
import MaxHeap from '../src/helpers/Heap.js';
import Graph from '../src/helpers/Graph.js';

const queue = new Queue();
queue.enqueue('orden-1');
queue.enqueue('orden-2');
assert.equal(queue.dequeue(), 'orden-1');
assert.equal(queue.front(), 'orden-2');

const stack = new Stack();
stack.push('mensaje-1');
stack.push('mensaje-2');
assert.equal(stack.peek(), 'mensaje-2');
assert.equal(stack.pop(), 'mensaje-2');

const tree = new BinaryTree();
['Moda', 'Artesania', 'Joyeria'].forEach((category) => tree.insert(category));
assert.deepEqual(tree.inOrder(), ['Artesania', 'Joyeria', 'Moda']);
assert.equal(tree.search('Moda'), true);

const heap = new MaxHeap();
heap.insert({ priority: 4.8, value: 'producto-a' });
heap.insert({ priority: 5, value: 'producto-b' });
assert.equal(heap.extractMax().value, 'producto-b');

const graph = new Graph(false);
graph.addEdge('Bogota', 'Medellin', 420);
graph.addEdge('Medellin', 'Cartagena', 635);
assert.deepEqual(graph.bfs('Bogota'), ['Bogota', 'Medellin', 'Cartagena']);
assert.equal(graph.hasEdge('Bogota', 'Medellin'), true);

console.log('Estructuras de datos verificadas correctamente.');
