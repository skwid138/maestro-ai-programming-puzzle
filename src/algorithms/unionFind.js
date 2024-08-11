export function runUnionFind(grid, state, sketch) {
  if (!state.initialized) {
    initializeUnionFind(grid, state);
    state.initialized = true;
  }

  if (state.unionFindSteps.length > 0) {
    const step = state.unionFindSteps.shift();
    state.currentCell = { row: step.row, col: step.col };
    grid[step.row][step.col] = 0;  // Mark the cell as visited
    sketch.redraw();
  } else {
    state.completed = true;
  }
}

function initializeUnionFind(grid, state) {
  const rows = grid.length;
  const cols = grid[0].length;

  state.parent = Array(rows * cols).fill(-1);
  state.rank = Array(rows * cols).fill(0);
  state.unionFindSteps = [];

  // Union-Find implementation to prepare steps
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        unionAdjacentCells(r, c, grid, state);
        state.unionFindSteps.push({ row: r, col: c });
      }
    }
  }
}

function unionAdjacentCells(r, c, grid, state) {
  const rows = grid.length;
  const cols = grid[0].length;
  const index = (r, c) => r * cols + c;

  if (r > 0 && grid[r - 1][c] === 1) union(index(r, c), index(r - 1, c), state);
  if (c > 0 && grid[r][c - 1] === 1) union(index(r, c), index(r, c - 1), state);
}

function find(i, state) {
  if (state.parent[i] === -1) return i;
  state.parent[i] = find(state.parent[i], state);
  return state.parent[i];
}

function union(x, y, state) {
  const xRoot = find(x, state);
  const yRoot = find(y, state);

  if (xRoot !== yRoot) {
    if (state.rank[xRoot] > state.rank[yRoot]) {
      state.parent[yRoot] = xRoot;
    } else if (state.rank[xRoot] < state.rank[yRoot]) {
      state.parent[xRoot] = yRoot;
    } else {
      state.parent[yRoot] = xRoot;
      state.rank[xRoot]++;
    }
  }
}
