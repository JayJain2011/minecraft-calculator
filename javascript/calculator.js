/* ===================================
   CALCULATOR ENGINE
=================================== */

const display =
    document.getElementById("display");

const resultText =
    document.querySelector(".result-text");

/* ===================================
   INPUT
=================================== */

function appendToDisplay(value) {

    if (display.value === "Error") {

        display.value = "";

    }

    display.value += value;

}

/* ===================================
   CLEAR
=================================== */

function clearDisplay() {

    display.value = "";

    resultText.textContent = "READY";

}

/* ===================================
   BACKSPACE
=================================== */

function backspace() {

    display.value =
        display.value.slice(0, -1);

}

/* ===================================
   SAFE CALCULATE
=================================== */

function evaluateExpression(expression) {

    expression = expression
        .replace(/÷/g, "/")
        .replace(/×/g, "*")
        .replace(/−/g, "-");

    return Function(
        `"use strict"; return (${expression})`
    )();

}

/* ===================================
   EASTER EGGS
=================================== */

function checkEasterEggs(expression) {

    switch (expression) {

        case "64":

            if (typeof unlockAchievement === "function") {

                unlockAchievement(
                    "stack_master",
                    "Stack Master"
                );

            }

            break;

        case "404":

            if (typeof showAchievementPopup === "function") {

                showAchievementPopup(
                    "Village Not Found"
                );

            }

            break;

        case "1337":

            if (typeof unlockAchievement === "function") {

                unlockAchievement(
                    "elite_engineer",
                    "Elite Engineer"
                );

            }

            break;

        case "9001":

            if (typeof showAchievementPopup === "function") {

                showAchievementPopup(
                    "Power Level Exceeded"
                );

            }

            break;

    }

}

/* ===================================
   HISTORY
=================================== */

function addToHistory(expression, result) {

    if (
        typeof gameData === "undefined"
    ) return;

    const entry = {

        expression,

        result,

        timestamp: Date.now()

    };

    gameData.history.unshift(entry);

    if (
        gameData.history.length > 30
    ) {

        gameData.history.pop();

    }

    if (
        typeof saveGame === "function"
    ) {

        saveGame();

    }

    if (
        typeof renderHistory === "function"
    ) {

        renderHistory();

    }

}

/* ===================================
   CALCULATE
=================================== */

function calculate() {

    try {

        const expression =
            display.value.trim();

        if (!expression) return;

        checkEasterEggs(expression);

        const result =
            evaluateExpression(expression);

        display.value = result;

        resultText.textContent =
            `RESULT: ${result}`;

        addToHistory(
            expression,
            result
        );

        if (
            typeof gameData !== "undefined"
        ) {

            gameData.calculations++;

            if (
                Math.abs(result) >
                gameData.highestResult
            ) {

                gameData.highestResult =
                    Math.abs(result);

            }

            if (
                typeof saveGame === "function"
            ) {

                saveGame();

            }

        }

        if (
            typeof awardXP === "function"
        ) {

            awardXP(result);

        }

        if (
            typeof checkAchievements ===
            "function"
        ) {

            checkAchievements();

        }

        if (
            typeof updateStats ===
            "function"
        ) {

            updateStats();

        }

    }

    catch {

        display.value = "Error";

        resultText.textContent =
            "INVALID EXPRESSION";

    }

}

/* ===================================
   BUTTONS
=================================== */

document
.querySelectorAll(".block-btn")
.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (
                typeof playClickSound ===
                "function"
            ) {

                playClickSound();

            }

            const text =
                button.textContent.trim();

            switch (text) {

                case "C":

                    clearDisplay();
                    break;

                case "⌫":

                    backspace();
                    break;

                case "CRAFT":

                    calculate();
                    break;

                default:

                    appendToDisplay(text);

            }

        }
    );

});

/* ===================================
   KEYBOARD SUPPORT
=================================== */

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;

        const allowed =
            "0123456789+-*/.%()";

        if (
            allowed.includes(key)
        ) {

            appendToDisplay(key);

        }

        if (key === "Enter") {

            event.preventDefault();

            calculate();

        }

        if (key === "Backspace") {

            backspace();

        }

        if (key === "Escape") {

            clearDisplay();

        }

    }
);

console.log(
    "⚡ CraftCalc Calculator Loaded"
);