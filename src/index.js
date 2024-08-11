import p5 from 'p5';
import './style.css';
import { fetchDataFiles, loadDataFile, readUploadedFile } from './utils/dataUtils';
import { runDFS } from './algorithms/dfs';
import { runBFS } from './algorithms/bfs';
import { runUnionFind } from './algorithms/unionFind';
import { runFloodFill } from './algorithms/floodFill';
import { initializeGrid, resetState } from './utils/gridUtils';

let grid = [];
let algorithm = 'dfs';
let state = resetState();

// Create the p5 instance
const p5Instance = new p5((sketch) => {
    sketch.setup = function () {
        const canvas = sketch.createCanvas(800, 600);
        canvas.parent('canvasContainer');
        sketch.noLoop();  // Prevent draw from looping automatically
    };

    sketch.draw = function () {
        console.log('Drawing grid...');
        sketch.clear();  // Clear the canvas before drawing
        sketch.background(255);  // Set the background to white
        drawGrid(sketch);
        if (!state.completed) {
            runAlgorithm(sketch);
        }
    };

    function drawGrid(sketch) {
        const cols = grid[0]?.length || 0;
        const rows = grid.length;
        const cellWidth = sketch.width / cols;
        const cellHeight = sketch.height / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                sketch.fill(grid[r][c] === 1 ? 0 : 255);
                sketch.rect(c * cellWidth, r * cellHeight, cellWidth, cellHeight);
            }
        }

        if (state.currentCell) {
            sketch.fill(200, 0, 0, 100);
            sketch.rect(state.currentCell.col * cellWidth, state.currentCell.row * cellHeight, cellWidth, cellHeight);
        }
    }

    function runAlgorithm(sketch) {
        switch (algorithm) {
            case 'dfs':
                runDFS(grid, state, sketch);
                break;
            case 'bfs':
                runBFS(grid, state, sketch);
                break;
            case 'union-find':
                runUnionFind(grid, state, sketch);
                break;
            case 'flood-fill':
                runFloodFill(grid, state, sketch);
                break;
        }
    }
});

// Function to reset the animation
function resetAnimation() {
    // Reset the grid and state
    grid = [];
    state = resetState();

    // Clear the p5 canvas
    p5Instance.clear();
    p5Instance.noLoop(); // Stop the drawing loop
    p5Instance.background(255); // Set the background to white
}

// Populate the data files dropdown on page load
document.addEventListener('DOMContentLoaded', () => {
    const dataFilesSelect = document.getElementById('dataFiles');
    fetchDataFiles(dataFilesSelect);
});

// Handle file input change (for both file upload and dropdown selection)
document.getElementById('fileInput').addEventListener('change', () => {
    resetAnimation(); // Reset animation
});

document.getElementById('dataFiles').addEventListener('change', () => {
    resetAnimation(); // Reset animation
});

// Handle algorithm selection change
document.getElementById('algorithm').addEventListener('change', () => {
    algorithm = document.getElementById('algorithm').value;
    resetAnimation(); // Reset animation
});

// Run the visualization on button click
document.getElementById('runButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const dataFilesSelect = document.getElementById('dataFiles');
    const selectedFile = dataFilesSelect.value;

    if (fileInput.files.length > 0) {
        readUploadedFile(fileInput.files[0], processFileContent);
    } else if (selectedFile) {
        loadDataFile(selectedFile, processFileContent);
    } else {
        alert('Please upload a file or select one from the list.');
    }
});

function processFileContent(content) {
    grid = initializeGrid(content);
    state = resetState();
    p5Instance.redraw();
}
