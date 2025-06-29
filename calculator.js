let display = document.getElementById("display");
let lastInputWasOperator = false;
let hasError = false;

function animateDisplay() {
    display.classList.remove('display-animated');
    requestAnimationFrame(() => {
        display.classList.add('display-animated');
    });
}

function appendNumber(numChar) {
    if (hasError) {
        display.innerText = "0";
        hasError = false;
    }

    if (display.innerText === "0" && numChar !== '.') {
        display.innerText = numChar;
    }
    else if (display.innerText === "0" && numChar === '.') {
        display.innerText += numChar;
    }
    else if (numChar === '.' && display.innerText.includes('.')) {
        const lastOperatorIndex = Math.max(
            display.innerText.lastIndexOf('+'),
            display.innerText.lastIndexOf('-'),
            display.innerText.lastIndexOf('*'),
            display.innerText.lastIndexOf('/')
        );
        const currentNumberSegment = display.innerText.substring(lastOperatorIndex + 1);
        if (currentNumberSegment.includes('.')) return;
        display.innerText += numChar;
    }
    else {
        display.innerText += numChar;
    }

    lastInputWasOperator = false;
    animateDisplay();
}

function appendOperator(operatorChar) {
    if (hasError) {
        display.innerText = "0";
        hasError = false;
    }

    if (lastInputWasOperator) {
        display.innerText = display.innerText.slice(0, -1) + operatorChar;
    } else {
        display.innerText += operatorChar;
    }

    lastInputWasOperator = true;
    animateDisplay();
}

function clearDisplay() {
    display.innerText = "0";
    lastInputWasOperator = false;
    hasError = false;
    animateDisplay();
}

function calculate() {
    if (hasError) {
        display.innerText = "0";
        hasError = false;
        return;
    }

    try {
        let expression = display.innerText.replace(/÷/g, '/').replace(/×/g, '*');
        let result = eval(expression);

        if (isNaN(result) || !isFinite(result)) {
            display.innerText = "Error";
            hasError = true;
        } else {
            display.innerText = result.toString();
        }
    } catch (e) {
        display.innerText = "Error";
        hasError = true;
    }

    lastInputWasOperator = false;
    animateDisplay();
}

function toggleSign() {
    if (hasError) {
        display.innerText = "0";
        hasError = false;
        return;
    }

    let currentExpression = display.innerText;
    const lastNumberMatch = currentExpression.match(/(-?\d+(\.\d+)?)(?!.*\d)/);

    if (lastNumberMatch) {
        const lastNumber = parseFloat(lastNumberMatch[1]);
        const toggledNumber = -lastNumber;
        display.innerText = currentExpression.substring(0, lastNumberMatch.index) + toggledNumber.toString();
    } else {
        let currentValue = parseFloat(display.innerText);
        if (!isNaN(currentValue)) {
            display.innerText = (-currentValue).toString();
        }
    }

    animateDisplay();
}

function calculatePercentage() {
    if (hasError) {
        display.innerText = "0";
        hasError = false;
        return;
    }

    let currentExpression = display.innerText;
    const lastNumberMatch = currentExpression.match(/(-?\d+(\.\d+)?)(?!.*\d)/);

    if (lastNumberMatch) {
        const lastNumber = parseFloat(lastNumberMatch[1]);
        const percentageValue = lastNumber / 100;
        display.innerText = currentExpression.substring(0, lastNumberMatch.index) + percentageValue.toString();
    } else {
        let currentValue = parseFloat(display.innerText);
        if (!isNaN(currentValue)) {
            display.innerText = (currentValue / 100).toString();
        }
    }

    animateDisplay();
}