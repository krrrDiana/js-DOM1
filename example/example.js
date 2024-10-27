let currentInput = ''; 

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').value = ''; 
    hideMessage();
}

function appendToDisplay(value) {
    const display = document.getElementById('display');

    const operators = ['+', '-', '*', '/'];
    if (operators.includes(value) && currentInput === '') {
        showMessage('Спочатку введіть число.');
        return;
    }

    if (operators.includes(value)) {
        if (currentInput === '' || operators.includes(currentInput.slice(-1))) {
            currentInput = currentInput.slice(0, -1) + value; 
        } else {
            currentInput += value; 
        }
    } else {
        currentInput += value; 
    }

    hideMessage();
    document.getElementById('display').value = currentInput;
}

function showMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    messageElement.style.display = 'block';
}

function hideMessage() {
    const messageElement = document.getElementById('message');
    messageElement.style.display = 'none';
}

function calculateResult() {
    const display = document.getElementById('display');

    if (currentInput.trim() === '') {
        showMessage('Введіть вираз для обчислення.');
        return;
    }

    const regex = /^[0-9+\-*/.]+$/; 
    if (!regex.test(currentInput)) {
        showMessage('Введено некоректні дані. Використовуйте лише цифри та оператори.');
        clearDisplay();
        return;
    }

    try {
        const result = eval(currentInput); 
        display.value = result % 1 === 0 ? result : result.toFixed(2); 
    } catch (error) {
        display.value = 'ПОМИЛКА'; 
        showMessage('Виникла помилка при обчисленні. Перевірте вираз.');
        clearDisplay();
    } finally {
        currentInput = '';
    }
}
