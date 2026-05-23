/**
 * Heap (Max-Heap)
 * Usada para: Ranking de productos por calificación
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Obtener índice del padre
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Obtener índice del hijo izquierdo
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Obtener índice del hijo derecho
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // Intercambiar dos elementos
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  // Insertar elemento
  insert(element) {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  // Subir elemento hacia la raíz si es mayor que su padre
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].priority > this.heap[parentIndex].priority) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Extraer elemento con máxima prioridad
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return max;
  }

  // Bajar elemento hacia las hojas
  bubbleDown(index) {
    while (true) {
      let largestIndex = index;
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex].priority > this.heap[largestIndex].priority
      ) {
        largestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority > this.heap[largestIndex].priority
      ) {
        largestIndex = rightChildIndex;
      }

      if (largestIndex !== index) {
        this.swap(index, largestIndex);
        index = largestIndex;
      } else {
        break;
      }
    }
  }

  // Obtener elemento máximo sin remover
  getMax() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  // Obtener tamaño del heap
  size() {
    return this.heap.length;
  }

  // Verificar si está vacío
  isEmpty() {
    return this.heap.length === 0;
  }

  // Obtener todo el heap
  getAll() {
    return [...this.heap];
  }

  // Limpiar el heap
  clear() {
    this.heap = [];
  }
}

export default MaxHeap;
