const fs = require('fs');

// Function to read and parse the grid from a file
function readGrid(filePath, callback) {
  if (!filePath) {
    console.error('Please provide the path to the grid text file as an argument.');
    process.exit(1);
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Convert the input file into a 2D array of rows and columns
    const grid = data.trim().split('\n').map(line => line.split('').map(Number));
    callback(grid);
  });
}

// Function to measure the execution time and memory usage of an algorithm
function measurePerformance(grid, algorithmName, algorithmFunction) {
  // Start the timer and record initial memory usage
  const startTime = process.hrtime();
  const initialMemory = process.memoryUsage().heapUsed;

  // Count the connected shapes using the specified algorithm
  const shapeCount = algorithmFunction(grid);

  // Calculate the execution time and memory usage
  const endTime = process.hrtime(startTime);
  const finalMemory = process.memoryUsage().heapUsed;

  console.log(`Number of connected shapes (${algorithmName}): ${shapeCount}`);
  console.log(`Execution time (${algorithmName}): ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  console.log(`Memory used (${algorithmName}): ${(finalMemory - initialMemory) / 1024} KB`);
}

// Function to iterate through each cell in the grid and apply the specified algorithm
function iterateGrid(grid, processCell) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new shape, increment the count
        processCell(i, j); // Process the entire shape
      }
    }
  }

  return count;
}

module.exports = {
  readGrid,
  measurePerformance,
  iterateGrid
};
