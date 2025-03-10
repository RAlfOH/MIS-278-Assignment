document.addEventListener('DOMContentLoaded', () => {
    // Waits for the HTML content to be fully loaded before executing the script

    // Select the display area where numbers & results appear
    const display = document.getElementById('display');

    // Select the calculator buttons container
    const buttonsContainer = document.querySelector('.calculator-buttons');

    // Select the theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');

    // Variables to store current expression and last input
    let currentExpression = ""; // Keeps track of the full equation
    let lastInput = ""; // Stores the last input to prevent consecutive operators

    // Attach event listeners for button clicks and keyboard input
    buttonsContainer.addEventListener('click', handleButtonClick); // Listen for button clicks
    document.addEventListener('keydown', handleKeyPress); // Listen for keyboard input
    themeToggle.addEventListener('click', toggleTheme); // Listen for theme toggle clicks

    // Handles button clicks on the calculator
    function handleButtonClick(event) {
        if (event.target.tagName.toLowerCase() !== 'button') return; // Ignore clicks that are not on buttons
        processInput(event.target.getAttribute('data-value')); // Get button's data-value and process it
    }

    // Handles keyboard input events
    function handleKeyPress(event) {
        // Maps specific keyboard keys to calculator functions
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

        if (!isNaN(event.key)) { // If a number key is pressed
            processInput(event.key);
        } 
        else if (keyMap[event.key]) { // If an operator or special key is pressed
            processInput(keyMap[event.key]);
        }
    }

    // Processes the input value from button clicks or keyboard input
    function processInput(value) {
        if (value === "clear") { // Clear the display when "C" is pressed
            clearDisplay();
        } 
        else if (value === "delete") { // Handle the delete function (Backspace)
            deleteLastCharacter();
        } 
        else if (value === "=") { // Perform calculation when "=" is pressed
            computeResult();
        } 
        else { // Otherwise, update the display with the input value
            updateDisplay(value);
        }
    }

    // Updates the display when a button or key is pressed
    function updateDisplay(value) {
        // Prevent multiple decimal points in the same number
        if (value === "." && lastInput.includes(".")) return;

        // Prevent consecutive operators (e.g., ++, --, **)
        if ("+-*/".includes(value) && "+-*/".includes(lastInput)) return;

        // Replace initial "0" with the first entered number (excluding ".")
        if (display.textContent === "0" && value !== ".") {
            currentExpression = value;
        } else {
            currentExpression += value;
        }

        lastInput = value; // Store last input value
        display.textContent = currentExpression; // Update the display

        // Check if the display height exceeds its max height (too many digits)
        if (display.scrollHeight > display.clientHeight) {
            display.textContent = "Too Long!"; // Show warning message
            display.style.backgroundColor = "red"; // Highlight warning in red
            setTimeout(() => {
                clearDisplay(); // Reset calculator after warning
            }, 1000);
        }
    }

    // Evaluates the mathematical expression when "=" is pressed
    function computeResult() {
        try {
            // Check for division by zero error
            if (currentExpression.includes("/0")) {
                throw new Error("Cannot divide by zero"); // Force an error
            }

            let result = eval(currentExpression); // Evaluate the mathematical expression

            if (!isFinite(result)) {
                throw new Error("Math Error"); // Catch invalid calculations (e.g., division by zero)
            }

            display.textContent = result; // Display the computed result
            currentExpression = result.toString(); // Allow further calculations

        } catch (error) {
            display.textContent = "Error"; // Show error message on display
            currentExpression = "0"; // Reset expression to prevent further errors
        }
    }

    // Deletes the last character when "Backspace" is pressed
    function deleteLastCharacter() {
        currentExpression = currentExpression.slice(0, -1); // Remove last character

        if (currentExpression === "") {
            currentExpression = "0"; // Reset to zero if all characters are deleted
        }

        display.textContent = currentExpression; // Update display
    }

    // Clears the entire display when "C" is pressed
    function clearDisplay() {
        display.textContent = "0"; // Reset display to 0
        display.style.backgroundColor = "black"; // Reset background color to black
        currentExpression = ""; // Clear stored expression
        lastInput = ""; // Clear last input
    }
});
