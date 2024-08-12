import p5 from 'p5';
import './style.css';
import { fetchDataFiles, loadDataFile, readUploadedFile } from './utils/dataUtils';
import { runDFS } from './algorithms/dfs';
import { runBFS } from './algorithms/bfs';
import { runUnionFind } from './algorithms/unionFind';
import { initializeGrid, resetState } from './utils/gridUtils';

let grid = [];
let algorithm = 'dfs'; // Default to DFS algorithm
let state = resetState();
let slowVisualization = false; // Flag to control visualization speed
const delayDuration = 1000; // Delay in milliseconds for slow visualization

const p5Instance = new p5((sketch) => {
    sketch.setup = function () {
        const canvas = sketch.createCanvas(800, 600);
        canvas.parent('canvasContainer');
        sketch.noLoop(); // Prevent draw from looping automatically
    };

    sketch.draw = function () {
        sketch.clear(); // Clear the canvas before drawing
        sketch.background(255); // Set the background to white
        drawGrid(sketch);
    };

    function drawGrid(sketch) {
        const cols = grid[0]?.length || 0;
        const rows = grid.length;
        const cellWidth = sketch.width / cols;
        const cellHeight = sketch.height / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 0) {
                    sketch.fill(255); // White for empty cells
                } else if (grid[r][c] === 1) {
                    sketch.fill(0); // Black for shape cells
                } else if (grid[r][c] === 2) {
                    sketch.fill(200, 0, 0, 100); // Red for the current cell being processed
                }
                sketch.rect(c * cellWidth, r * cellHeight, cellWidth, cellHeight);
            }
        }

        if (state.currentCell) {
            sketch.fill(200, 0, 0, 100);
            sketch.rect(state.currentCell.col * cellWidth, state.currentCell.row * cellHeight, cellWidth, cellHeight);
        }
    }
});

function executeAlgorithm() {
    // Run the selected algorithm
    switch (algorithm) {
        case 'dfs':
            runDFS(grid, state);
            break;
        case 'bfs':
            runBFS(grid, state);
            break;
        case 'union-find':
            runUnionFind(grid, state);
            break;
    }

    // Update the shape count in the UI
    document.getElementById('shapeCount').textContent = state.shapeCount;

    // Redraw the sketch to reflect changes
    p5Instance.redraw();

    // Determine the next step based on completion status and visualization speed
    if (!state.completed) {
        if (slowVisualization) {
            setTimeout(executeAlgorithm, delayDuration); // Delay for slow visualization
        } else {
            requestAnimationFrame(executeAlgorithm); // Immediate for fast visualization
        }
    } else {
        console.log('Algorithm completed');
    }
}

function runAlgorithm() {
    state.shapeCount = 0;
    state.completed = false; // Reset completion status

    // Start the algorithm execution
    if (slowVisualization) {
        setTimeout(executeAlgorithm, delayDuration); // Start with delay if slow visualization is on
    } else {
        requestAnimationFrame(executeAlgorithm); // Start immediately if fast visualization
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const dataFilesSelect = document.getElementById('dataFiles');
    fetchDataFiles(dataFilesSelect);

    // Event listener to update the algorithm when the user selects a different one
    document.getElementById('algorithm').addEventListener('change', (event) => {
        algorithm = event.target.value;  // Update the selected algorithm
        console.log('Algorithm changed to:', algorithm);
    });

    // Event listener for the Slow Visualization toggle switch
    const toggleSpeedSwitch = document.getElementById('toggleSpeed');
    toggleSpeedSwitch.addEventListener('change', () => {
        slowVisualization = toggleSpeedSwitch.checked; // Update the flag based on the switch state
        console.log(`Slow Visualization mode is now ${slowVisualization ? 'On' : 'Off'}`);
    });
});

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
    console.log('Starting new visualization with algorithm:', algorithm);

    // Trigger the algorithm to start running
    runAlgorithm();
}
