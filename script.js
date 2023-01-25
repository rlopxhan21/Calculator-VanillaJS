const display1Elm = document.querySelector(".display-1");
const display2Elm = document.querySelector(".display-2");
const tempResultElm = document.querySelector(".tempResult");

const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const allClear = document.querySelector(".btn-ac");
const clear = document.querySelector(".btn-c");

let display1 = "";
let display2 = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach((num) => {
  num.addEventListener("click", (event) => {
    if (event.target.innerText === "." && !haveDot) {
      haveDot = true;
    } else if (event.target.innerText === "." && haveDot) {
      return;
    }

    display2 += event.target.innerText;
    display2Elm.innerText = display2;
  });
});

operations.forEach((operation) => {
  operation.addEventListener("click", (event) => {
    if (!display2) {
      return;
    } else {
      haveDot = false;
      const operationName = event.target.innerText;

      if (display1 && display2 && lastOperation) {
        mathOperation();
      } else {
        result = parseFloat(display2);
      }

      clearVar(operationName);
      lastOperation = operationName;
    }
  });
});

const clearVar = (optName = "") => {
  display1 += display2 + " " + optName + " ";
  display1Elm.innerText = display1;
  display2Elm.innerText = "";
  display2 = "";
  tempResultElm.innerText = result;
};

const mathOperation = () => {
  if (lastOperation === "X") {
    result = parseFloat(result) * parseFloat(display2);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(display2);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(display2);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(display2);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(display2);
  }
};

equal.addEventListener("click", (event) => {
  if (!display1 || !display2) {
    return;
  }

  mathOperation();
  clearVar();
  display2Elm.innerText = result;
  tempResultElm.innerText = "";
  display1 = "";
  display2 = result;
});

allClear.addEventListener("click", (event) => {
  display1Elm.innerText = "0";
  display2Elm.innerText = "0.00";
  display1 = "";
  display2 = "";
  result = "";
  tempResultElm.innerText = "";
});

clear.addEventListener("click", (event) => {
  display2Elm.innerHTML = "";
  display2 = "";
});
