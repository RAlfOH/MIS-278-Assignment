document.addEventListener('DOMContentLoaded', () => {
    // Select the display area where numbers & results appear
    const display = document.getElementById('display');
    // Select the calculator buttons container
    const buttonsContainer = document.querySelector('.calculator-buttons');
    // Select the theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');

    // Variables to store current expression and last input
    let currentExpression = ""; // Keeps track of the full equation
    let lastInput = ""; // Stores the last input to prevent errors

    // Attach event listeners for button clicks and keyboard input
    buttonsContainer.addEventListener('click', handleButtonClick);
    document.addEventListener('keydown', handleKeyPress);
    themeToggle.addEventListener('click', toggleTheme);

    function handleButtonClick(event) {
        if (event.target.tagName.toLowerCase() !== 'button') return; // Ignore non-button clicks
        processInput(event.target.getAttribute('data-value')); // Process the button value
    }

    function handleKeyPress(event) {
        const keyMap = {
            "Enter": "=",
            "Escape": "clear",
            "/": "/",
            "*": "*",
            "-": "-",
            "+": "+",
            ".": ".",
            "Backspace": "delete" // Enable Backspace key for deleting characters
        };

        if (!isNaN(event.key)) { // If a number is pressed
            processInput(event.key);
        } else if (keyMap[event.key]) { // If an operator or special key is pressed
            processInput(keyMap[event.key]);
        }
    }

    function processInput(value) {
        if (value === "clear") { // Clear the display when "C" is pressed
            clearDisplay();
        } 
        else if (value === "delete") { // Handle the delete function
            deleteLastCharacter();
        } 
        else if (value === "=") { // Perform calculation when "=" is pressed
            computeResult();
        } 
        else { // Otherwise, update the display
            updateDisplay(value);
        }
    }
    function updateDisplay(value) {
        // Prevent multiple decimal points in the same number
        if (value === "." && lastInput.includes(".")) return;

        // Prevent multiple operators in a row (e.g., "++" or "--")
        if ("+-*/".includes(value) && "+-*/".includes(lastInput)) return;

        // If starting a new calculation, replace "0" with the input
        if (display.textContent === "0" && value !== ".") {
            currentExpression = value;
        } 
        else {
            currentExpression += value; // Append input to the current expression
        }

        lastInput = value; // Store the last entered character
        display.textContent = currentExpression; // Update display
    }

    function computeResult() {
        try {
            // Check for division by zero error
            if (currentExpression.includes("/0")) {
                throw new Error("Cannot divide by zero"); // Force an error
            }

            let result = eval(currentExpression); // Evaluate the mathematical expression

            if (!isFinite(result)) {
                throw new Error("Math Error"); // Catch invalid calculations
            }

            display.textContent = result; // Display the result
            currentExpression = result.toString(); // Allow further calculations

        } catch (error) {
            display.textContent = "Error"; // Show error message on display
            currentExpression = "0"; // Reset expression
        }
    }

    function deleteLastCharacter() {
        currentExpression = currentExpression.slice(0, -1); // Remove last character
        if (currentExpression === "") {
            currentExpression = "0"; // Reset to zero if all characters are deleted
        }
        display.textContent = currentExpression;
    }
    function clearDisplay() {
        display.textContent = "0"; // Reset display to 0
        currentExpression = ""; // Clear stored expression
        lastInput = ""; // Clear last input
    }
});

