export function runBFS(grid, state, sketch) {
  if (state.queue.length === 0) {
    // Find the first unvisited cell to start the BFS
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        if (grid[r][c] === 1) {
          state.queue.push({ row: r, col: c });
          break;
        }
      }
      if (state.queue.length > 0) break;
    }
  }

  if (state.queue.length > 0) {
    const { row, col } = state.queue.shift();
    state.currentCell = { row, col };

    if (row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] === 0) {
      return;
    }

    grid[row][col] = 0;  // Mark the cell as visited

    // Enqueue neighboring cells
    state.queue.push({ row: row - 1, col });  // up
    state.queue.push({ row: row + 1, col });  // down
    state.queue.push({ row, col: col - 1 });  // left
    state.queue.push({ row, col: col + 1 });  // right

    // Redraw the grid with the updated state
    sketch.redraw();
  } else {
    state.completed = true;  // Mark the algorithm as completed
  }
}
