const debugLogs = false;

/**
 * Union Find (also known as Disjoint-Set)
 * 
 * Used to efficiently manage and merge disjoint sets
 * In this context, it's used to find and merge connected shapes in the grid
 * 
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application 
 */
export function runUnionFind(grid, state) {
  debugLogs && console.log('in runUnionFind');

  // If the algorithm hasn't been initialized, initialize it
  if (!state.initialized) {
    initializeUnionFind(grid, state);
    state.initialized = true;
  }

  // If there are still steps to process (cells to visit)
  if (state.unionFindSteps.length > 0) {
    // Get the next step from the front of the queue
    const step = state.unionFindSteps.shift();

    // Highlight the current cell being processed
    state.currentCell = { row: step.row, col: step.col };

    // Simulate marking the cell as visited (for traversal visualization)
    grid[step.row][step.col] = 2; // Use 2 to represent cells being processed (different color)

    // Trigger the next iteration with a visual update
    requestAnimationFrame(() => runUnionFind(grid, state));
  } else {
    // If no more steps are left, mark the algorithm as completed
    state.completed = true;
    debugLogs && console.log('Final shape count:', state.shapeCount);
  }
}

/**
 * Initialize the Union-Find structure and prepare the algorithm steps
 * 
 * This function sets up the parent and rank arrays, which are crucial to the Union-Find algorithm
 * It also populates the steps array with the cells that need to be processed
 * 
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application 
 */
function initializeUnionFind(grid, state) {
  debugLogs && console.log('in initializeUnionFind');
  const rows = grid.length;
  const cols = grid[0].length;

  // Initialize the parent array where each element is initially its own parent
  state.parent = Array(rows * cols).fill(-1);

  // Initialize the rank array for union by rank optimization
  state.rank = Array(rows * cols).fill(0);

  // Array to keep track of steps for processing
  state.unionFindSteps = [];

  // Iterate through each cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) { // If the cell is part of a shape
        // Union the cell with its adjacent cells
        unionAdjacentCells(r, c, grid, state);

        // Add the cell to the steps array to process it later
        state.unionFindSteps.push({ row: r, col: c });

        // Mark the shape cells with a specific number for visualization
        grid[r][c] = 1; // Use 1 to represent cells belonging to a shape (different color)
      }
    }
  }

  // After union operations, count the number of unique roots (distinct shapes)
  const rootSet = new Set();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        rootSet.add(find(r * cols + c, state)); // Add the root of each cell to the set
      }
    }
  }
  // The number of unique roots is the number of distinct shapes
  state.shapeCount = rootSet.size;
}

/**
 * Union a cell with its adjacent cells
 * 
 * This function checks the cells adjacent to the current cell (up, down, left, right) 
 * and performs a union operation if the adjacent cell is also part of a shape
 * 
 * @param {number} r Row index of the cell
 * @param {number} c Column index of the cell
 * @param {*} grid A 2D array of rows and columns
 * @param {*} state The current state of the application 
 */
function unionAdjacentCells(r, c, grid, state) {
  debugLogs && console.log('in unionAdjacentCells');
  const rows = grid.length;
  const cols = grid[0].length;

  // Helper function to calculate the linear index of a cell in the grid
  const index = (r, c) => r * cols + c;

  // Check and union with the cell above
  if (r > 0 && grid[r - 1][c] === 1) union(index(r, c), index(r - 1, c), state);

  // Check and union with the cell to the left
  if (c > 0 && grid[r][c - 1] === 1) union(index(r, c), index(r, c - 1), state);

  // Check and union with the cell below
  if (r < rows - 1 && grid[r + 1][c] === 1) union(index(r, c), index(r + 1, c), state);

  // Check and union with the cell to the right
  if (c < cols - 1 && grid[r][c + 1] === 1) union(index(r, c), index(r, c + 1), state);
}

/**
 * Find the root of the set containing the element i
 * 
 * This function implements path compression, which flattens the structure of the tree, 
 * making future queries faster by pointing all nodes directly to the root.
 * 
 * @param {number} i The index of the element in the parent array
 * @param {*} state The current state of the application 
 * @returns The root of the set containing i
 */
function find(i, state) {
  debugLogs && console.log('in find');
  // If the element is its own parent, return it as the root
  if (state.parent[i] === -1) return i;

  // Recursively find the root and apply path compression
  state.parent[i] = find(state.parent[i], state);

  // Return the root
  return state.parent[i];
}

/**
 * Union the sets containing elements x and y
 * 
 * This function merges two sets. It uses the rank array to ensure that the smaller tree 
 * is always added under the root of the larger tree, keeping the tree shallow.
 * 
 * @param {number} x The index of the first element
 * @param {number} y The index of the second element
 * @param {*} state The current state of the application 
 */
function union(x, y, state) {
  debugLogs && console.log('in union');
  // Find the roots of the elements
  const xRoot = find(x, state);
  const yRoot = find(y, state);

  // If they have different roots, we need to merge the sets
  if (xRoot !== yRoot) {
    // Union by rank: attach the shorter tree under the root of the taller tree
    if (state.rank[xRoot] > state.rank[yRoot]) {
      state.parent[yRoot] = xRoot;
    } else if (state.rank[xRoot] < state.rank[yRoot]) {
      state.parent[xRoot] = yRoot;
    } else {
      // If both have the same rank, choose one as the root and increment its rank
      state.parent[yRoot] = xRoot;
      state.rank[xRoot]++;
    }
  }
}
