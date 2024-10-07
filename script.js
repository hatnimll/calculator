const buttons = Array.from(document.querySelectorAll('.button'));
const display = document.querySelector('#display');
const numberButtons = Array.from(document.querySelectorAll('.number'));
const operatorButtons = Array.from(document.querySelectorAll('.operator'));

let isOperatorClicked = false;
let isCalculateClicked = false;
let firstOperand = null;
let secondOperand = null;
let operator = null;

function displayNumberInput(numberButton) {
  if (display.textContent === '0' || isOperatorClicked === true) {
    display.textContent = numberButton.textContent;
    if (firstOperand !== null) {
      secondOperand = Number(display.textContent);
    }
    isOperatorClicked = false;
  } else {
    display.textContent += numberButton.textContent;
    if (firstOperand !== null) {
      secondOperand = Number(display.textContent);
    }
  }
}

function handleOperator(operatorButton) {
  if (operator === null) {
    operator = operatorButton.textContent;
    firstOperand = Number(display.textContent);
    console.log(`first Operand : ${firstOperand}`);
    console.log(`Operator : ${operator}`);
    isOperatorClicked = true;
  } else {
    displayResult();
    operator = operatorButton.textContent;
    isOperatorClicked = true;
    console.log(`first Operand : ${firstOperand}`);
    console.log(`Operator : ${operator}`);
  }
}

function calculate(first, second, op) {
  switch (op) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return first / second;
  }
}

function displayResult() {
  if (firstOperand !== null && secondOperand !== null && operator !== null) {
    const result = calculate(firstOperand, secondOperand, operator);
    display.textContent = result;

    if (isCalculateClicked === true) {
      firstOperand = null;
      secondOperand = null;
      operator = null;
      isOperatorClicked = false;
      isCalculateClicked = false;
    } else {
      firstOperand = Number(display.textContent);
    }
  }
}

function reset() {
  display.textContent = '0';
  firstOperand = null;
  secondOperand = null;
  operator = null;
  isOperatorClicked = false;
}

function signToggle() {
  display.textContent = -display.textContent;
}

function handlePersentage() {
  if (firstOperand === null && operator === null) {
    display.textContent = Number(display.textContent) / 100;
  } else {
    display.textContent = (firstOperand / 100) * secondOperand;
    secondOperand = display.textContent;
  }
}

function handleDecimal() {
  switch (display.textContent.includes('.')) {
    case false:
      display.textContent = display.textContent + '.';
  }
}

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    if (numberButtons.includes(button)) {
      displayNumberInput(button);
    } else if (operatorButtons.includes(button)) {
      handleOperator(button);
    } else if (button.textContent === '=') {
      isCalculateClicked = true;
      displayResult();
    } else if (button.textContent === 'C') {
      reset();
    } else if (button.textContent === '±') {
      signToggle();
    } else if (button.textContent === '%') {
      handlePersentage();
    } else if (button.textContent === '.') {
      handleDecimal();
    }
  });
});
