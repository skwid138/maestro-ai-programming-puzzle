const fs = require('fs');

// Get the file path from command-line arguments
const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the path to the grid text file as an argument.');
  process.exit(1);
}

// Read and parse the grid from the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Convert the input file into a 2D array of rows and columns
  const grid = data.trim().split('\n').map(line => line.split('').map(Number));

  // Start the timer and record initial memory usage
  const startTime = process.hrtime();
  const initialMemory = process.memoryUsage().heapUsed;

  // Count the connected shapes using DFS
  const shapeCount = countConnectedShapesDFS(grid);

  // Calculate the execution time and memory usage
  const endTime = process.hrtime(startTime);
  const finalMemory = process.memoryUsage().heapUsed;

  console.log(`Number of connected shapes (DFS): ${shapeCount}`);
  console.log(`Execution time (DFS): ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  console.log(`Memory used (DFS): ${(finalMemory - initialMemory) / 1024} KB`);
});

// Function to count connected shapes using DFS
function countConnectedShapesDFS(grid) {
  if (!grid || grid.length === 0) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to perform DFS from a given cell
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return;

    // Mark the cell as visited by setting it to 0
    grid[r][c] = 0;

    // Recursively visit all four neighboring cells
    dfs(r - 1, c); // up
    dfs(r + 1, c); // down
    dfs(r, c - 1); // left
    dfs(r, c + 1); // right
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new shape, increment the count
        dfs(i, j); // Perform DFS to mark the entire shape
      }
    }
  }

  return count; // Return the total number of connected shapes
}
