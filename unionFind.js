const { readGrid, measurePerformance } = require('./utils');

// Union-Find (Disjoint Set Union) implementation
function countConnectedShapesUnionFind(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const parent = Array(rows * cols).fill(-1); // Array to store the parent of each cell
  const rank = Array(rows * cols).fill(0); // Array to store the rank (depth) of each tree

  const find = (i) => {
    if (parent[i] === -1) return i;
    parent[i] = find(parent[i]); // Path compression
    return parent[i];
  };

  const union = (x, y) => {
    const xRoot = find(x);
    const yRoot = find(y);
    if (xRoot !== yRoot) {
      if (rank[xRoot] > rank[yRoot]) {
        parent[yRoot] = xRoot;
      } else if (rank[xRoot] < rank[yRoot]) {
        parent[xRoot] = yRoot;
      } else {
        parent[yRoot] = xRoot;
        rank[xRoot]++;
      }
    }
  };

  const index = (r, c) => r * cols + c;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        if (r > 0 && grid[r - 1][c] === 1) union(index(r, c), index(r - 1, c));
        if (c > 0 && grid[r][c - 1] === 1) union(index(r, c), index(r, c - 1));
      }
    }
  }

  const rootSet = new Set();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        rootSet.add(find(index(r, c)));
      }
    }
  }

  return rootSet.size;
}

// Read the grid and measure performance of the Union-Find algorithm
readGrid(process.argv[2], (grid) => {
  measurePerformance(grid, 'Union-Find', countConnectedShapesUnionFind);
});
