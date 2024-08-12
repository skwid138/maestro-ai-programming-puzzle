/**
 * Flood Fill using BFS
 * Create a queue of cells (array of objects) using row and column coordinates
 * for the first cell of a shape
 * Then loop through the queue checking each cell's neighboring cells for additional 1s
 * pushing the cells neighboring those cells containing 1s into the queue 
 * until the entire shape has been found, then repeating the process for the next shape
 * 
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application 
 */
export function runFloodFill(grid, state) {
  const debugLogs = false;
  while (!state.completed) {
    // If the queue is empty, initialize the BFS by finding the first unvisited cell
    if (state.queue.length === 0) {
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
            // Push the starting cell into the queue
            state.queue.push({ row: r, col: c });
            // Increment shape count when a new shape is found
            state.shapeCount++;
            // Indicate that we found a new shape, exit the column loop
            foundShape = true;
            break;
          }
        }
        // Exit the row loop if the first cell of a shape was found
        if (state.queue.length > 0) break;
      }

      // If no new shape was found
      if (!foundShape) {
        // Mark the algorithm as completed
        state.completed = true;
        // Exit the outer while loop
        break;
      }
    }

    debugLogs && console.log('Pre queue loop state.queue -> ', state.queue);
    debugLogs && console.log('Pre queue loop state.shapeCount -> ', state.shapeCount);

    // Continue the Flood Fill as long as there are cells in the queue
    while (state.queue.length > 0) {
      debugLogs && console.log(`Entering while loop`);
      // Remove the first cell from the queue
      const { row, col } = state.queue.shift();
      debugLogs && console.log(`Processing cell at row: ${row}, column: ${col}`);

      // Update the current cell being processed
      state.currentCell = { row, col };

      // Check if the current cell is within the grid's bounds and is part of a shape
      if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0) {
        debugLogs && console.log(`Skipping cell at row: ${row}, column: ${col} (out of bounds or already visited)`);
        continue;
      }

      // Mark the cell as visited
      grid[row][col] = 0;

      // Enqueue neighboring cells
      state.queue.push({ row: row - 1, col }); // up
      state.queue.push({ row: row + 1, col }); // down
      state.queue.push({ row, col: col - 1 }); // left
      state.queue.push({ row, col: col + 1 }); // right
    }
  }

  debugLogs && console.log('Final grid:', JSON.stringify(grid));
  debugLogs && console.log('Final shape count:', state.shapeCount);
}
