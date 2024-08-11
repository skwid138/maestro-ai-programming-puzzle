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
  console.log(grid);

  // Start the timer and record initial memory usage
  const startTime = process.hrtime();
  const initialMemory = process.memoryUsage().heapUsed;

  // Count the connected shapes using BFS
  const shapeCount = countConnectedShapesBFS(grid);

  // Calculate the execution time and memory usage
  const endTime = process.hrtime(startTime);
  const finalMemory = process.memoryUsage().heapUsed;

  console.log(`Number of connected shapes (BFS): ${shapeCount}`);
  console.log(`Execution time (BFS): ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  console.log(`Memory used (BFS): ${(finalMemory - initialMemory) / 1024} KB`);
});

// Function to count connected shapes using BFS
function countConnectedShapesBFS(grid) {
  if (!grid || grid.length === 0) return 0;

  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to perform BFS from a given cell
  function bfs(r, c) {
    const queue = [];
    queue.push([r, c]); // Start BFS from the current cell
    grid[r][c] = 0; // Mark the cell as visited by setting it to 0

    const directions = [
      [-1, 0], // up
      [1, 0],  // down
      [0, -1], // left
      [0, 1]   // right
    ];

    // Process the queue until it is empty
    while (queue.length > 0) {
      const [x, y] = queue.shift(); // Dequeue the front element

      // Explore all four neighboring cells
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Check if the neighbor is within bounds and is part of the shape
        if (newX >= 0 && newY >= 0 && newX < rows && newY < cols && grid[newX][newY] === 1) {
          grid[newX][newY] = 0; // Mark it as visited
          queue.push([newX, newY]); // Enqueue the neighbor
        }
      }
    }
  }

  // Iterate through each cell in the grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 1) {
        count++; // Found a new shape, increment the count
        bfs(i, j); // Perform BFS to mark the entire shape
      }
    }
  }

  return count; // Return the total number of connected shapes
}
