// Get the display element
const display = document.getElementById('display');

// Variables to store calculator values
let firstNumber = '';
let operator = '';
let secondNumber = '';

// Add event listeners to number buttons
const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.innerText);
  });
});

// Add event listeners to operator buttons
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
  button.addEventListener('click', () => {
    setOperator(button.innerText);
  });
});

// Add event listener to equals button
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', () => {
  calculate();
});

// Add event listener to clear button
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  clearCalculator();
});

// Add event listener to backspace button
const backspaceButton = document.getElementById('backspace');
backspaceButton.addEventListener('click', () => {
  removeLastCharacter();
});

// Function to append a number to the display
function appendNumber(number) {
  if (number === '.' && display.value.includes('.')) {
    return;
  }
  display.value += number;
}

// Function to set the operator
function setOperator(selectedOperator) {
  if (firstNumber && operator && secondNumber) {
    calculate();
  }
  firstNumber = display.value;
  operator = selectedOperator;
  display.value = '';
}

// Function to perform the calculation
function calculate() {
  if (!firstNumber || !operator || !display.value) {
    return;
  }
  
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(display.value);
  
  let result;
  
  switch (operator) {
    case '+':
      result = add(num1, num2);
      break;
    case '-':
      result = subtract(num1, num2);
      break;
    case '*':
      result = multiply(num1, num2);
      break;
    case '/':
      result = divide(num1, num2);
      break;
    default:
      return;
  }
  
  display.value = roundResult(result);
  
  firstNumber = display.value;
  operator = '';
  secondNumber = '';
}

// Function to round the result to a maximum of 8 decimal places
function roundResult(result) {
  return Math.round((result + Number.EPSILON) * 1e8) / 1e8;
}

// Function to clear the calculator
function clearCalculator() {
  display.value = '';
  firstNumber = '';
  operator = '';
  secondNumber = '';
}

// Function to remove the last character from the display
function removeLastCharacter() {
  display.value = display.value.slice(0, -1);
}

// Math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'Error: Division by zero';
  }
  return a / b;
}
