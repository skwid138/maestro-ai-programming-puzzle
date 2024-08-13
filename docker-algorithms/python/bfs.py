import time
import psutil
import sys
from collections import deque

# Reads the grid from a file and returns a 2D array of integers (0s and 1s)
# creating rows with the rows columns
def read_grid(file_name):
    with open(file_name, 'r') as file:
        # Create an array with each row as a string
        # then strip the whitespace characters like '\n'
        # next convert each row string into an array of that row's columns as strings
        # use map and int to convert each cell value from a string to an integer
        # finally create the 2D list
        grid = [list(map(int, list(line.strip()))) for line in file.readlines()]
    return grid

# Performs Breadth-First Search (BFS) to explore and mark all connected cells in a shape
def bfs(grid, r, c):
    rows = len(grid)
    cols = len(grid[0])
    queue = deque([(r, c)])
    
    while queue:
        # Remove the first cell from the queue (FIFO)
        row, col = queue.popleft()

        # Check if the current cell is within the grid's bounds and is part of a shape
        if row < 0 or col < 0 or row >= rows or col >= cols or grid[row][col] == 0:
            continue
        
        # Mark the cell as visited
        grid[row][col] = 0

        # Enqueue neighboring cells to continue the BFS
        queue.append((row - 1, col)) # up
        queue.append((row + 1, col)) # down
        queue.append((row, col - 1)) # left
        queue.append((row, col + 1)) # right

# Counts the number of connected shapes in the grid using BFS
def count_connected_shapes_bfs(grid):
    shape_count = 0

    # Loop through the rows of the grid
    for r in range(len(grid)):
        # Loop through the columns of the current row
        for c in range(len(grid[0])):
            # If the cell is part of a shape (contains a 1), start a BFS
            if grid[r][c] == 1:
                bfs(grid, r, c)
                # Increment shapeCount when a new shape is found
                shape_count += 1
    
    return shape_count

# Measures the performance (execution time and memory usage) of the DFS algorithm
def measure_performance(grid, func):
    # Measure the memory before running the algorithm
    process = psutil.Process()
    mem_before = process.memory_info().rss / 1024 # in KB

    start_time = time.time()
    shape_count = func(grid)
    end_time = time.time()

    # Measure the memory after running the algorithm
    mem_after = process.memory_info().rss / 1024 # in KB

    exec_time = (end_time - start_time) * 1000 # in milliseconds
    mem_used = mem_after - mem_before

    return shape_count, exec_time, mem_used

# Execute the BFS algorithm and report the results
def main():
    if len(sys.argv) != 2:
        print("Usage: python bfs.py <input_file>")
        sys.exit(1)
    
    file_name = sys.argv[1]
    grid = read_grid(file_name)

    shape_count, exec_time, mem_used = measure_performance(grid, count_connected_shapes_bfs)

    print(f"Number of connected shapes (BFS): {shape_count}")
    print(f"Execution time (BFS): {exec_time:.6f}s")
    print(f"Memory used (BFS): {mem_used:.4f} KB")

if __name__ == "__main__":
    main()
