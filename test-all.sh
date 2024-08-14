#!/bin/bash

echo "********** Begin DFS **********"
echo ""
echo "Running DFS on data_small.txt"

echo ""
echo "Node.js"
docker run --rm maestro-shapes-node node dfs.js data_small.txt

echo ""
echo "Python"
docker run --rm maestro-shapes-python python dfs.py data_small.txt

echo ""
echo "Running DFS on data_large.txt"

echo ""
echo "Node.js"
docker run --rm maestro-shapes-node node dfs.js data_large.txt

echo ""
echo "Python"
docker run --rm maestro-shapes-python python dfs.py data_large.txt

echo ""
echo "********** End DFS **********"
echo ""
echo "********** Begin BFS **********"

echo ""
echo "Running BFS on data_small.txt"

echo ""
echo "Node.js"
docker run --rm maestro-shapes-node node bfs.js data_small.txt

echo ""
echo "Python"
docker run --rm maestro-shapes-python python bfs.py data_small.txt

echo ""
echo "Running BFS on data_large.txt"

echo ""
echo "Node.js"
docker run --rm maestro-shapes-node node bfs.js data_large.txt

echo ""
echo "Python"
docker run --rm maestro-shapes-python python bfs.py data_large.txt

echo ""
echo "********** End BFS **********"
