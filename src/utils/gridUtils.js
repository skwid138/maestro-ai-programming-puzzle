/**
 * Create a 2D array from a string representation of a grid
 * trim ensures no leading or trailing whitespace
 * split('\n') splits the string into an array of rows
 * map finally converts each row into an array of numbers for it's columns
 * @param {string} text String representation of a grid
 * @returns 
 */
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
