document.addEventListener('DOMContentLoaded', function() {
    const output = document.getElementById('output');
    const buttons = document.querySelectorAll('button');
    const warning = document.getElementById('warning');
    let expression = '';
    
    const updateDisplay = () => { output.textContent = expression || '0'; }
    const showWarning = (message) => { warning.textContent = message; setTimeout(() => warning.textContent = '', 2000); }
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.textContent;
            
            switch(value) {
                case 'C':
                    expression = '';
                    break;
                case '←':
                    expression = expression.slice(0, -1);
                    break;
                case '=':
                    try {
                        expression = eval(expression.replace('×', '*').replace('÷', '/'));
                    } catch {
                        showWarning('Invalid Expression');
                    }
                    break;
                default:
                    expression += value;
                    break;
            }
            updateDisplay();
        });
    });
    
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        if(/[0-9+\-*/.]/.test(key)) {
            expression += key;
            updateDisplay();
        } else if(key === 'Enter') {
            try {
                expression = eval(expression.replace('×', '*').replace('÷', '/'));
            } catch {
                showWarning('Invalid Expression');
            }
            updateDisplay();
        } else if(key === 'Backspace') {
            expression = expression.slice(0, -1);
            updateDisplay();
        } else {
            showWarning('Only numbers are allowed');
        }
    });
});
