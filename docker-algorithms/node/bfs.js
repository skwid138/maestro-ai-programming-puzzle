const { readGrid, measurePerformance, iterateGrid } = require('./utils');

// BFS function to mark the entire shape
function bfs(grid, r, c) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [[r, c]];

  grid[r][c] = 0; // Mark the cell as visited

  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1]   // right
  ];

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // Explore all four neighboring cells
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      if (newX >= 0 && newY >= 0 && newX < rows && newY < cols && grid[newX][newY] === 1) {
        grid[newX][newY] = 0; // Mark as visited
        queue.push([newX, newY]); // Enqueue the neighbor
      }
    }
  }
}

// Function to count connected shapes using BFS
function countConnectedShapesBFS(grid) {
  return iterateGrid(grid, (r, c) => bfs(grid, r, c));
}

// Read the grid and measure performance of the BFS algorithm
readGrid(process.argv[2], (grid) => {
  measurePerformance(grid, 'BFS', countConnectedShapesBFS);
});
