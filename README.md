# Why

Each script utilizes a different algorithm to solve the problem. This allows for testing the results against each other as well as checking the performance of each.

## Docker Usage

- First build the desired image 
  - node: `docker build -f Dockerfile.node -t maestro-shapes-node .`
  - python `docker build -f Dockerfile.python -t maestro-shapes-python .`

### Depth-First Search (DFS) 
- Run the Node DFS script with small data: `docker run --rm maestro-shapes-node node dfs.js data_small.txt`

```
Number of connected shapes (DFS): 13
Execution time (DFS): 0s 0.572252ms
Memory used (DFS): 2.0546875 KB
```

- Run the DFS script with large data: `docker run --rm maestro-shapes-node node dfs.js data_large.txt`

```
Number of connected shapes (DFS): 663
Execution time (DFS): 0s 2.250764ms
Memory used (DFS): 2.109375 KB
```

- Run the Python DFS script with small data: `docker run --rm maestro-shapes-python python dfs.py data_small.txt`

```
Number of connected shapes (DFS): 13
Execution time (DFS): 0.420570s
Memory used (DFS): 0.0000 KB
```

 Run the Python DFS script with large data: `docker run --rm maestro-shapes-python python dfs.py data_large.txt`

 ```
Number of connected shapes (DFS): 663
Execution time (DFS): 5.587816s
Memory used (DFS): 0.0000 KB
 ```

### Breadth-First Search (BFS)
- Run the Node BFS script with small data: `docker run --rm maestro-shapes-node node bfs.js data_small.txt`

```
Number of connected shapes (BFS): 13
Execution time (BFS): 0s 0.816396ms
Memory used (BFS): 333.328125 KB
```

- Run the Node BFS script with large data: `docker run --rm maestro-shapes-node node bfs.js data_large.txt`

```
Number of connected shapes (BFS): 663
Execution time (BFS): 0s 10.894949ms
Memory used (BFS): 542.9765625 KB
```

- Run the Python BFS script with small data: `docker run --rm maestro-shapes-python python bfs.py data_small.txt`

```
Number of connected shapes (BFS): 13
Execution time (BFS): 0.373125s
Memory used (BFS): 0.0000 KB
```

 Run the Python BFS script with large data: `docker run --rm maestro-shapes-python python bfs.py data_large.txt`

 ```
Number of connected shapes (BFS): 663
Execution time (BFS): 5.525112s
Memory used (BFS): 0.0000 KB
 ```

### Union Find
- Run the Union Find script  with small data: `docker run --rm maestro-shapes-node node unionFind.js data_small.txt`

```
Number of connected shapes (Union-Find): 13
Execution time (Union-Find): 0s 0.978859ms
Memory used (Union-Find): 26.3046875 KB
```

- Run the Union Find script with large data: `docker run --rm maestro-shapes-node node unionFind.js data_large.txt`

```
Number of connected shapes (Union-Find): 663
Execution time (Union-Find): 0s 4.008323ms
Memory used (Union-Find): 203.921875 KB
```

## Client Animation Usage

This was an attempt to make a visualization of how each algorithm traverses the grid.
It isn't functioning as I had hoped yet.

I'll host a version of the app [here](https://codecurio.us/grid-traversal/)

Build the production bundle running `npm run build`

For Development use `npm run start`


