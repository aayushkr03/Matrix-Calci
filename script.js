const matrixAInput = document.getElementById('matrix-a');
const matrixBInput = document.getElementById('matrix-b');
const calculateBtn = document.getElementById('calculate-btn');
const resultContainer = document.getElementById('result-container');
const resultPre = document.getElementById('result');

calculateBtn.addEventListener('click', function() {
  const matrixA = parseMatrix(matrixAInput.value);
  const matrixB = parseMatrix(matrixBInput.value);

  if (matrixA && matrixB && canMultiply(matrixA, matrixB)) {
    const result = multiplyMatrices(matrixA, matrixB);
    resultPre.innerText = formatMatrix(result);
    resultContainer.style.display = 'block';
  } else {
    alert('Invalid matrices or incompatible dimensions for multiplication.');
  }
});

function parseMatrix(matrixStr) {
  const rows = matrixStr.trim().split('\n');
  if (!rows.length) return null;

  const numCols = rows[0].split(/\s+/).length;  // Split by whitespace

  const matrix = [];
  for (const row of rows) {
    const rowValues = row.split(/\s+/).map(Number); // Convert to numbers
    if (rowValues.length !== numCols) return null;  // Check consistent columns
    matrix.push(rowValues);
  }
  return matrix;
}

function canMultiply(matrixA, matrixB) {
  return matrixA[0].length === matrixB.length; // Check columns of A match rows of B
}

function multiplyMatrices(matrixA, matrixB) {
  const resultRows = matrixA.length;
  const resultCols = matrixB[0].length;
  const result = [];

  for (let i = 0; i < resultRows; i++) {
    result[i] = [];
    for (let j = 0; j < resultCols; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[0].length; k++) {  // Columns of A, Rows of B
        sum += matrixA[i][k] * matrixB[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
}

function formatMatrix(matrix) {
  return matrix.map(row => row.join(' ')).join('\n'); // Join rows and elements
}
