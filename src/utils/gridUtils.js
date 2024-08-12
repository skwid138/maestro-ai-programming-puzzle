export function initializeGrid(text) {
  return text.trim().split('\n').map(line => line.split('').map(Number));
}

export function resetState() {
  return {
    currentCell: null,
    stack: [],           // For DFS
    queue: [],           // For BFS and Flood Fill
    initialized: false,  // For Union-Find
    parent: [],          // For Union-Find
    rank: [],            // For Union-Find optimization
    unionFindSteps: [],  // Optional: For tracking Union-Find operations
    completed: false,     // Flag to indicate when the algorithm is done
    shapeCount: 0,       // Count the number of shapes
  };
}
