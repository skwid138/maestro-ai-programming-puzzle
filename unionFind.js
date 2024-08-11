const fs = require('fs');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide the path to the grid text file as an argument.');
  process.exit(1);
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const grid = data.trim().split('\n').map(line => line.split('').map(Number));

  const startTime = process.hrtime();
  const initialMemory = process.memoryUsage().heapUsed;

  const shapeCount = countConnectedShapesUnionFind(grid);

  const endTime = process.hrtime(startTime);
  const finalMemory = process.memoryUsage().heapUsed;

  console.log(`Number of connected shapes (Union-Find): ${shapeCount}`);
  console.log(`Execution time (Union-Find): ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  console.log(`Memory used (Union-Find): ${(finalMemory - initialMemory) / 1024} KB`);
});

function countConnectedShapesUnionFind(grid) {
  if (!grid || grid.length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const parent = Array(rows * cols).fill(-1);
  const rank = Array(rows * cols).fill(0);

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

  // Step 1: Apply union-find to connect the components
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        if (r > 0 && grid[r - 1][c] === 1) union(index(r, c), index(r - 1, c));
        if (c > 0 && grid[r][c - 1] === 1) union(index(r, c), index(r, c - 1));
      }
    }
  }

  // Step 2: Count the distinct roots to determine the number of connected components
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
