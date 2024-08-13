const { readGrid, measurePerformance, iterateGrid } = require('./utils');

// Flood Fill function to mark the entire shape
function floodFill(grid, r, c) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return;

  grid[r][c] = 0; // Mark the cell as visited

  // Recursively visit all four neighboring cells
  floodFill(grid, r - 1, c); // up
  floodFill(grid, r + 1, c); // down
  floodFill(grid, r, c - 1); // left
  floodFill(grid, r, c + 1); // right
}

// Function to count connected shapes using Flood Fill
function countConnectedShapesFloodFill(grid) {
  return iterateGrid(grid, (r, c) => floodFill(grid, r, c));
}

// Read the grid and measure performance of the Flood Fill algorithm
readGrid(process.argv[2], (grid) => {
  measurePerformance(grid, 'Flood Fill', countConnectedShapesFloodFill);
});
