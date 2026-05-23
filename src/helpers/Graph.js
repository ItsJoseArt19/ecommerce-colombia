/**
 * Grafo (Graph)
 * Usada para: Red de ciudades y puntos de entrega conectados
 */
class Graph {
  constructor(isDirected = false) {
    this.adjacencyList = {};
    this.isDirected = isDirected;
  }

  // Agregar vértice (nodo)
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // Agregar arista (conexión entre dos vértices)
  addEdge(vertex1, vertex2, weight = 1) {
    // Agregar vértices si no existen
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    // Agregar arista
    this.adjacencyList[vertex1].push({ node: vertex2, weight });

    // Si no es dirigido, agregar también la arista inversa
    if (!this.isDirected) {
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
  }

  // Obtener todos los vértices
  getVertices() {
    return Object.keys(this.adjacencyList);
  }

  // Obtener vecinos de un vértice
  getNeighbors(vertex) {
    return this.adjacencyList[vertex] || [];
  }

  // BFS (Breadth-First Search)
  bfs(startVertex) {
    const visited = {};
    const queue = [startVertex];
    const result = [];

    visited[startVertex] = true;

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex);

      const neighbors = this.getNeighbors(vertex);
      for (let neighbor of neighbors) {
        if (!visited[neighbor.node]) {
          visited[neighbor.node] = true;
          queue.push(neighbor.node);
        }
      }
    }

    return result;
  }

  // DFS (Depth-First Search)
  dfs(startVertex, visited = {}) {
    const result = [];
    visited[startVertex] = true;
    result.push(startVertex);

    const neighbors = this.getNeighbors(startVertex);
    for (let neighbor of neighbors) {
      if (!visited[neighbor.node]) {
        result.push(...this.dfs(neighbor.node, visited));
      }
    }

    return result;
  }

  // Verificar si existe una arista entre dos vértices
  hasEdge(vertex1, vertex2) {
    const neighbors = this.adjacencyList[vertex1] || [];
    return neighbors.some(n => n.node === vertex2);
  }

  // Obtener distancia entre dos vértices
  getDistance(vertex1, vertex2) {
    const neighbors = this.adjacencyList[vertex1] || [];
    const neighbor = neighbors.find(n => n.node === vertex2);
    return neighbor ? neighbor.weight : null;
  }

  // Obtener todas las aristas
  getEdges() {
    const edges = [];
    for (let vertex in this.adjacencyList) {
      for (let neighbor of this.adjacencyList[vertex]) {
        edges.push({
          from: vertex,
          to: neighbor.node,
          weight: neighbor.weight
        });
      }
    }
    return edges;
  }

  // Limpiar el grafo
  clear() {
    this.adjacencyList = {};
  }
}

export default Graph;
