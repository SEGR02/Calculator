document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const keys = document.querySelectorAll(".key");

  let displayValue = "0";
  let waitingForSecondOperand = false;
  let operator = null;
  let firstOperand = null;

  function updateDisplay() {
    display.textContent = displayValue;
  }

  updateDisplay();

  keys.forEach((key) => {
    key.addEventListener("click", function () {
      const keyValue = key.textContent;
      if (key.id === "clear") {
        resetCalculator();
      } else if (key.id === "equals") {
        handleEquals();
      } else if (["+", "-", "*", "/"].includes(keyValue)) {
        handleOperator(keyValue);
      } else {
        handleNumber(keyValue);
      }
      updateDisplay();
    });
  });

  function resetCalculator() {
    displayValue = "0";
    waitingForSecondOperand = false;
    operator = null;
    firstOperand = null;
  }

  function handleNumber(num) {
    if (waitingForSecondOperand) {
      displayValue = num;
      waitingForSecondOperand = false;
    } else {
      displayValue = displayValue === "0" ? num : displayValue + num;
    }
  }

  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      operator = nextOperator;
      return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstOperand = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
  }

  function handleEquals() {
    if (operator && !waitingForSecondOperand) {
      const inputValue = parseFloat(displayValue);
      const result = performCalculation[operator](firstOperand, inputValue);

      displayValue = `${parseFloat(result.toFixed(7))}`;
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
    }
  }

  const performCalculation = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "*": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "/": (firstOperand, secondOperand) =>
      secondOperand === 0 ? "Error" : firstOperand / secondOperand,
  };
});
