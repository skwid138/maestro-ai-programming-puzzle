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

  // Count the connected shapes using the Flood Fill algorithm
  const shapeCount = countConnectedShapesFloodFill(grid);

  // Calculate the execution time and memory usage
  const endTime = process.hrtime(startTime);
  const finalMemory = process.memoryUsage().heapUsed;

  console.log(`Number of connected shapes (Flood Fill): ${shapeCount}`);
  console.log(`Execution time (Flood Fill): ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  console.log(`Memory used (Flood Fill): ${(finalMemory - initialMemory) / 1024} KB`);
});

// Function to count connected shapes using Flood Fill
function countConnectedShapesFloodFill(grid) {
  if (!grid || grid.length === 0) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to perform the flood fill from a given cell
  function floodFill(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === 0) return;

    // Mark the cell as visited by setting it to 0
    grid[r][c] = 0;

    // Recursively visit all four neighboring cells
    floodFill(r - 1, c); // up
    floodFill(r + 1, c); // down
    floodFill(r, c - 1); // left
    floodFill(r, c + 1); // right
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new shape, increment the count
        floodFill(i, j); // Perform flood fill to mark the entire shape
      }
    }
  }

  return count; // Return the total number of connected shapes
}
