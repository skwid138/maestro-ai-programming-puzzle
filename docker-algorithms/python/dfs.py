import time
import psutil
import sys

# Reads the grid from a file and returns a 2D array of integers (0s and 1s)
# creating rows with the rows columns
def read_grid(file_name):
    with open(file_name, 'r') as file:
        grid = [list(map(int, list(line.strip()))) for line in file.readlines()]
    return grid

# Performs Depth-First Search (DFS) to explore and mark all connected cells in a shape
def dfs(grid, r, c):
    rows = len(grid)
    cols = len(grid[0])
    stack = [(r, c)]
    
    while stack:
        # Remove the last cell from the stack (LIFO)
        row, col = stack.pop()

        # Check if the current cell is within the grid's bounds and is part of a shape
        if row < 0 or col < 0 or row >= rows or col >= cols or grid[row][col] == 0:
            continue
        
        # Mark the cell as visited by setting it to 0
        grid[row][col] = 0

        # Push neighboring cells onto the stack to continue the DFS
        stack.append((row - 1, col)) # up
        stack.append((row + 1, col)) # down
        stack.append((row, col - 1)) # left
        stack.append((row, col + 1)) # right

# Counts the number of connected shapes in the grid using DFS
def count_connected_shapes_dfs(grid):
    shape_count = 0

    # Loop through the rows of the grid
    for r in range(len(grid)):
        # Loop through the columns of the current row
        for c in range(len(grid[0])):
            # If the cell is part of a shape (contains a 1), start a DFS
            if grid[r][c] == 1:
                dfs(grid, r, c)
                # Increment the shape count when a new shape is found
                shape_count += 1
    
    return shape_count

# Measures the performance (execution time and memory usage) of the DFS algorithm
def measure_performance(grid, func):
    # Measure memory before running the algorithm
    process = psutil.Process()
    mem_before = process.memory_info().rss / 1024  # in KB

    start_time = time.time()
    shape_count = func(grid)
    end_time = time.time()

    # Measure memory after running the algorithm
    mem_after = process.memory_info().rss / 1024  # in KB

    exec_time = end_time - start_time
    mem_used = mem_after - mem_before

    return shape_count, exec_time, mem_used

# Execute the DFS algorithm and report the results
def main():
    if len(sys.argv) != 2:
        print("Usage: python dfs.py <input_file>")
        sys.exit(1)
    
    file_name = sys.argv[1]
    grid = read_grid(file_name)

    shape_count, exec_time, mem_used = measure_performance(grid, count_connected_shapes_dfs)

    print(f"Number of connected shapes (DFS): {shape_count}")
    print(f"Execution time (DFS): {exec_time:.6f}s")
    print(f"Memory used (DFS): {mem_used:.4f} KB")

if __name__ == "__main__":
    main()
