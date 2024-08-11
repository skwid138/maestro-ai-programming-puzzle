export function fetchDataFiles(dataFilesSelect, basePath = '../data/') {
  // Clear existing options
  dataFilesSelect.innerHTML = '<option value="">-- Select a file --</option>';

  // Manually list data files
  const dataFiles = [
    'data_small.txt',
    'data_large.txt',
    'data_test_1.txt',
    'data_test_2.txt',
    'data_test_3.txt',
  ];

  // Create a Set to track added files and avoid duplicates
  const uniqueFiles = new Set();

  // Populate the dropdown menu with data files
  dataFiles.forEach(file => {
    if (!uniqueFiles.has(file)) {
      uniqueFiles.add(file);
      const option = document.createElement('option');
      option.value = `${basePath}${file}`;  // Construct the full path to the data file
      option.textContent = file;
      dataFilesSelect.appendChild(option);
    }
  });
}

export function loadDataFile(selectedFile, onLoad) {
  if (selectedFile) {
    fetch(selectedFile)
      .then(response => response.text())
      .then(onLoad)
      .catch(error => console.error('Error fetching selected file:', error));
  }
}

export function readUploadedFile(file, onLoad) {
  const reader = new FileReader();
  reader.onload = function (event) {
    onLoad(event.target.result);
  };
  reader.readAsText(file);
}

