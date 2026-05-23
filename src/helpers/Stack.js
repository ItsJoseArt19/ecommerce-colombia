/**
 * Pila (Stack) - LIFO (Last In First Out)
 * Usada para: Historial de mensajes de chat
 */
class Stack {
  constructor() {
    this.items = [];
  }

  // Agregar elemento al tope de la pila
  push(element) {
    this.items.push(element);
  }

  // Remover elemento del tope de la pila
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Ver el elemento del tope sin remover
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Verificar si la pila está vacía
  isEmpty() {
    return this.items.length === 0;
  }

  // Obtener el tamaño de la pila
  size() {
    return this.items.length;
  }

  // Obtener toda la pila
  getAll() {
    return [...this.items];
  }

  // Limpiar la pila
  clear() {
    this.items = [];
  }
}

export default Stack;
