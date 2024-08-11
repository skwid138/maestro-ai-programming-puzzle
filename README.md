# Why

Each script utilizes a different algorithm to solve the problem. This allows for testing the results against each other as well as checking the performance of each.

## Usage

- First build the image `docker build -t maestro-shapes .`

### DFS 
- Run the DFS script with small data: `docker run --rm maestro-shapes npm run start:dfs data_small.txt`

```
Number of connected shapes (DFS): 13
Execution time (DFS): 0s 0.572252ms
Memory used (DFS): 2.0546875 KB
```

- Run the DFS script with large data: `docker run --rm maestro-shapes npm run start:dfs data_large.txt`

```
Number of connected shapes (DFS): 663
Execution time (DFS): 0s 2.250764ms
Memory used (DFS): 2.109375 KB
```

### BFS
- Run the BFS script  with small data: `docker run --rm maestro-shapes npm run start:bfs data_small.txt`

```
Number of connected shapes (BFS): 13
Execution time (BFS): 0s 0.816396ms
Memory used (BFS): 333.328125 KB
```

- Run the BFS script with large data: `docker run --rm maestro-shapes npm run start:bfs data_large.txt`

```
Number of connected shapes (BFS): 663
Execution time (BFS): 0s 10.894949ms
Memory used (BFS): 542.9765625 KB
```

### Flood Fill
- Run the Flood Fill script  with small data: `docker run --rm maestro-shapes npm run start:flood-fill data_small.txt`

```
Number of connected shapes (Flood Fill): 13
Execution time (Flood Fill): 0s 0.75092ms
Memory used (Flood Fill): 2.0546875 KB
```

- Run the Flood Fill script with large data: `docker run --rm maestro-shapes npm run start:flood-fill data_large.txt`

```
Number of connected shapes (Flood Fill): 663
Execution time (Flood Fill): 0s 3.999173ms
Memory used (Flood Fill): 2.0546875 KB
```

### Union Find
- Run the Union Find script  with small data: `docker run --rm maestro-shapes npm run start:union-find data_small.txt`

```
Number of connected shapes (Union-Find): 13
Execution time (Union-Find): 0s 0.978859ms
Memory used (Union-Find): 26.3046875 KB
```

- Run the Union Find script with large data: `docker run --rm maestro-shapes npm run start:union-find data_large.txt`

```
Number of connected shapes (Union-Find): 663
Execution time (Union-Find): 0s 4.008323ms
Memory used (Union-Find): 203.921875 KB
```
