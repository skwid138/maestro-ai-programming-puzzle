export function initializeGrid(text) {
  return text.trim().split('\n').map(line => line.split('').map(Number));
}

export function resetState() {
  return {
    currentCell: null,
    stack: [],
    completed: false
  };
}
