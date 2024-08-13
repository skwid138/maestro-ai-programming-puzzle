/**
 * Depth-First Search
 * Create a stack of cells (array of objects) using row and column coordinates 
 * for the first cell of a shape
 * Then loop through the stack checking each cell's neighboring cells for additional 1s
 * pushing the cells neighboring those cells containing 1s into the queue
 * until the entire shape has been found, then repeating the process for the next shape
 * 
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application
 */
export function runDFS(grid, state) {
  const debugLogs = false;
  while (!state.completed) {
    // If the stack is empty, initialize the DFS by finding the first unvisited cell
    if (state.stack.length === 0) {
      debugLogs && console.log(`Initial grid:`, JSON.stringify(grid));
      let foundShape = false;

      // Loop through the rows of the grid
      for (let r = 0; r < grid.length; r++) {
        debugLogs && console.log('Looping through row: ', r);
        // Loop through the columns of the current row
        for (let c = 0; c < grid[0].length; c++) {
          debugLogs && console.log(`Looping through row: ${r}, column: ${c}`);
          // Cell is part of a shape
          if (grid[r][c] === 1) {
            debugLogs && console.log(`Found shape at row: ${r}, column: ${c}`);
            // Push the starting cell onto the stack
            state.stack.push({ row: r, col: c });
            // Increment shapeCount when a new shape is found
            state.shapeCount++;
            // Indicate that we found a new shape, exit the column loop
            foundShape = true;
            break;
          }
        }
        // Exit the row loop if the first cell of a shape was found
        if (foundShape) break;
      }

      // If no new shape was found
      if (!foundShape) {
        // Mark the algorithm as completed
        state.completed = true;
        // Exit the outer while loop
        break;
      }
    }

    debugLogs && console.log('Pre stack loop state.stack -> ', state.stack);
    debugLogs && console.log('Pre stack loop state.shapeCount -> ', state.shapeCount);

    // Continue the DFS as long as there are cells in the stack
    while (state.stack.length > 0) {
      debugLogs && console.log(`Entering while loop`);
      // Remove the last cell from the stack LIFO
      const { row, col } = state.stack.pop();
      debugLogs && console.log(`Processing cell at row: ${row}, column: ${col}`);

      // Update the current cell being processed
      state.currentCell = { row, col };

      // Check if the current cell is within the grid's bounds and is part of a shape
      if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0) {
        debugLogs && console.log(`Skipping cell at row: ${row}, column: ${col} (out of bounds or already visited)`);
        continue;  // Skip this cell if it's out of bounds or already visited
      }

      // Mark the cell as visited by setting it to 0
      grid[row][col] = 0;

      // Push neighboring cells onto the stack to continue the DFS
      if (row - 1 >= 0 && grid[row - 1][col] === 1) {
        state.stack.push({ row: row - 1, col }); // up
      }
      if (row + 1 < grid.length && grid[row + 1][col] === 1) {
        state.stack.push({ row: row + 1, col }); // down
      }
      if (col - 1 >= 0 && grid[row][col - 1] === 1) {
        state.stack.push({ row, col: col - 1 }); // left
      }
      if (col + 1 < grid[0].length && grid[row][col + 1] === 1) {
        state.stack.push({ row, col: col + 1 }); // right
      }
    }
  }

  debugLogs && console.log('Final grid:', JSON.stringify(grid));
  debugLogs && console.log('Final shape count:', state.shapeCount);
}