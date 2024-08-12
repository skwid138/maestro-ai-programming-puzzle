/**
 * Breadth-First Search (BFS) Algorithm
 * This function traverses the grid to identify and count connected shapes made of 1s.
 * The grid is treated as a 2D array, and each cell is processed to identify connected components.
 * 
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application
 */
export function runBFS(grid, state) {
  const debugLogs = false;

  // If the queue is empty, initialize the BFS by finding the first unvisited cell
  if (state.queue.length === 0) {
    debugLogs && console.log(`Initial grid:`, JSON.stringify(grid));
    let foundShape = false;

    // Loop through the rows of the grid to find the starting point of the next shape
    for (let r = 0; r < grid.length; r++) {
      debugLogs && console.log('Looping through row: ', r);
      // Loop through the columns of the current row
      for (let c = 0; c < grid[0].length; c++) {
        debugLogs && console.log(`Looping through row: ${r}, column: ${c}`);
        // If the cell is 1, it's part of a new shape
        if (grid[r][c] === 1) {
          debugLogs && console.log(`Found shape at row: ${r}, column: ${c}`);
          // Push the starting cell into the queue
          state.queue.push({ row: r, col: c });
          // Increment shapeCount when a new shape is found
          state.shapeCount++;
          // Indicate that we found a new shape and exit the loops
          foundShape = true;
          break;
        }
      }
      // Exit the outer loop if a shape was found
      if (foundShape) break;
    }

    // If no new shape was found, mark the algorithm as completed and exit
    if (!foundShape) {
      state.completed = true;
      debugLogs && console.log('Final grid:', JSON.stringify(grid));
      debugLogs && console.log('Final shape count:', state.shapeCount);
      return;
    }
  }

  debugLogs && console.log('Pre queue loop state.queue -> ', state.queue);
  debugLogs && console.log('Pre queue loop state.shapeCount -> ', state.shapeCount);

  // Process the current cell in the queue
  if (state.queue.length > 0) {
    debugLogs && console.log(`Entering queue processing loop`);
    // Remove the first cell from the queue
    const { row, col } = state.queue.shift();
    debugLogs && console.log(`Processing cell at row: ${row}, column: ${col}`);

    // Update the current cell being processed
    state.currentCell = { row, col };

    // Check if the current cell is within the grid's bounds and is part of a shape
    if (row >= 0 && col >= 0 && row < grid.length && col < grid[0].length && grid[row][col] === 1) {
      // Mark the cell as visited by setting it to 0
      grid[row][col] = 0;

      // Mark the current cell as visited by changing its value to 2 for visualization
      grid[row][col] = 2;

      // Enqueue neighboring cells to continue the BFS
      if (row - 1 >= 0 && grid[row - 1][col] === 1) {
        state.queue.push({ row: row - 1, col }); // up
      }
      if (row + 1 < grid.length && grid[row + 1][col] === 1) {
        state.queue.push({ row: row + 1, col }); // down
      }
      if (col - 1 >= 0 && grid[row][col - 1] === 1) {
        state.queue.push({ row, col: col - 1 }); // left
      }
      if (col + 1 < grid[0].length && grid[row][col + 1] === 1) {
        state.queue.push({ row, col: col + 1 }); // right
      }
    } else {
      debugLogs && console.log(`Skipping cell at row: ${row}, column: ${col} (out of bounds or already visited)`);
    }
    // Trigger the next iteration
    requestAnimationFrame(() => runBFS(grid, state));
  }
}
