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
        };

        if (!isNaN(event.key)) { // If a number is pressed
            processInput(event.key);
        } 
        else if (keyMap[event.key]) { // If an operator or special key is pressed
            processInput(keyMap[event.key]);
        }
    }

   
    function processInput(value) {
        if (value === "clear") { // Clear the display when "C" is pressed
            clearDisplay();
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

    //Computes the final result and displays it
     
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

            // Notify the user about the successful calculation
            window.alert(`Calculation Successful! The result is: ${result}`);

        } catch (error) {
            display.textContent = "Error"; // Show error message on display
            currentExpression = "0"; // Reset expression

            // Notify the user about the error
            if (error.message === "Cannot divide by zero") {
                window.alert("Error: You cannot divide by zero! Please try again.");
            } 
            else {
                window.alert("Error: Invalid Calculation. Please check your input.");
            }
        }
    }

    //Clears the calculator display
     
    function clearDisplay() {
        display.textContent = "0"; // Reset display to 0
        currentExpression = ""; // Clear stored expression
        lastInput = ""; // Clear last input
    }

    //Toggles between light mode and dark mode themes
     
    function toggleTheme() {
        document.body.classList.toggle('light-mode'); // Toggle theme class
        themeToggle.textContent = document.body.classList.contains('light-mode') ? "🌙" : "☀️"; // Change button icon
    }
});
