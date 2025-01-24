const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
    result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
    if (digit === "." && (currentNumber.includes(".") || !currentNumber)) {
        return;
    }
    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit;
    }
    updateResult();
}

function setOperator(newOperator) {
    if (currentNumber) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentNumber.replace(",", "."));
        } else {
            calculate(); // Calcula se já houver um primeiro operando
        }
        operator = newOperator; // Armazena o operador
        currentNumber = ""; // Limpa o número atual para o próximo input
    }
}

function calculate() {
    if (operator === null || firstOperand === null || currentNumber === "") return;
    let secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperand + secondOperand;
            break;
        case "-":
            resultValue = firstOperand - secondOperand;
            break;
        case "x":
            resultValue = firstOperand * secondOperand;
            break;
        case "÷":
            resultValue = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    // Limitar a 5 casas decimais
    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    } else {
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperand = null; // Reseta o primeiro operando
    restart = true;
    updateResult();
}

function clearCalculator() {
    currentNumber = "";
    firstOperand = null;
    operator = null;
    updateResult(true);
}

function setPercentage() {
    if (currentNumber === "") return; // Se não houver número atual, não faz nada
    firstOperand = parseFloat(currentNumber.replace(",", ".")); // Armazena o primeiro número
    currentNumber = ""; // Limpa o número atual para o próximo input
}

function calculatePercentage(secondOperand) {
    if (firstOperand === null) return; // Se não houver primeiro operando, não faz nada
    const resultValue = (firstOperand * secondOperand) / 100; // Calcula a porcentagem
    currentNumber = resultValue.toString(); // Atualiza o número atual com o resultado
    updateResult();
}

buttons.forEach((button) => {
    button.addEventListener("click", () => { 
        const buttonText = button.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText);
        } else if (["+", "-", "x", "÷"].includes(buttonText)) {
            setOperator(buttonText); // Armazena o operador
        } else if (buttonText === "%") {
            setPercentage(); // Armazena o primeiro número
        } else if (buttonText === "=") {
            if (currentNumber) {
                const secondOperand = parseFloat(currentNumber.replace(",", ".")); // Armazena o segundo número
                if (operator) {
                    calculate(); // Chama a função de calcular
                } else {
                    calculatePercentage(secondOperand); // Chama a função de calcular a porcentagem
                }
            }
        } else if (buttonText === "C") {
            clearCalculator();
        } else if (buttonText === "±") {
            currentNumber = (
                parseFloat(currentNumber || firstOperand) * -1
            ).toString();
            updateResult();
        }
    });
});