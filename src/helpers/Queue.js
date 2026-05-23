/**
 * Cola (Queue) - FIFO (First In First Out)
 * Usada para: Procesamiento de órdenes en secuencia
 */
class Queue {
  constructor() {
    this.items = [];
  }

  // Agregar elemento al final de la cola
  enqueue(element) {
    this.items.push(element);
  }

  // Quitar elemento del frente de la cola
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Ver el primer elemento sin remover
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Verificar si la cola está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener el tamaño de la cola
  size() {
    return this.items.length;
  }

  // Obtener toda la cola
  getAll() {
    return [...this.items];
  }

  // Limpiar la cola
  clear() {
    this.items = [];
  }
}

export default Queue;
