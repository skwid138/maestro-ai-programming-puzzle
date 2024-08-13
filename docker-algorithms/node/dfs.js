const { readGrid, measurePerformance, iterateGrid } = require('./utils');

// DFS function to mark the entire shape
function dfs(grid, r, c) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return;

  grid[r][c] = 0; // Mark the cell as visited

  // Recursively visit all four neighboring cells
  dfs(grid, r - 1, c); // up
  dfs(grid, r + 1, c); // down
  dfs(grid, r, c - 1); // left
  dfs(grid, r, c + 1); // right
}

// Function to count connected shapes using DFS
function countConnectedShapesDFS(grid) {
  return iterateGrid(grid, (r, c) => dfs(grid, r, c));
}

// Read the grid and measure performance of the DFS algorithm
readGrid(process.argv[2], (grid) => {
  measurePerformance(grid, 'DFS', countConnectedShapesDFS);
});
