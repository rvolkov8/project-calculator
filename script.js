const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const allClearButton = document.querySelector("#all-clear-button");
const deleteButton = document.querySelector("#delete-button");
const equalsButton = document.querySelector("#equals-button");
const previousOperandText = document.querySelector(".previous-operand");
const currentOperandText = document.querySelector(".current-operand");

class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operator = undefined; 
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand.toString().length >= 15) return;  
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    appendOperator(operator) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case "/":
                computation = prev / current;
                break;
            case "×":
                computation = prev * current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "+":
                computation = prev + current;
                break;
            default:
                break;
        }
        if (computation < 999999999999999) {
            this.currentOperand = computation;
            this.operator = undefined;
            this.previousOperand = "";
        } else {
            return;
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.textContent = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operator != null) {
            this.previousOperandText.textContent = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandText.textContent = this.getDisplayNumber(this.previousOperand);
        }
    }
}

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendOperator(button.textContent);
        calculator.compute();
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});