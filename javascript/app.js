/* ===================================
   CRAFTCALC MASTER CONTROLLER
=================================== */

/* ===================================
   ELEMENTS
=================================== */

const resetButton =
    document.getElementById(
        "reset-progress"
    );

const scientificButton =
    document.getElementById(
        "scientific-toggle"
    );

/* ===================================
   SCIENTIFIC MODE
=================================== */

let scientificMode = false;

function toggleScientificMode() {

    scientificMode =
        !scientificMode;

    if (!scientificButton)
        return;

    scientificButton.textContent =
        scientificMode
        ? "🧪 SCIENTIFIC ON"
        : "🧪 SCIENTIFIC";

    showSystemMessage(
        scientificMode
        ? "Scientific Mode Enabled"
        : "Scientific Mode Disabled"
    );

}

/* ===================================
   RESET SYSTEM
=================================== */

function confirmReset() {

    const confirmed =
        confirm(
            "Reset all CraftCalc progress?"
        );

    if (!confirmed)
        return;

    resetGame();

}

/* ===================================
   SYSTEM MESSAGE
=================================== */

function showSystemMessage(
    message
) {

    const resultText =
        document.querySelector(
            ".result-text"
        );

    if (!resultText)
        return;

    const oldText =
        resultText.textContent;

    resultText.textContent =
        message;

    setTimeout(() => {

        resultText.textContent =
            oldText;

    }, 2500);

}

/* ===================================
   BUTTON EVENTS
=================================== */

if (scientificButton) {

    scientificButton.addEventListener(
        "click",
        toggleScientificMode
    );

}

if (resetButton) {

    resetButton.addEventListener(
        "click",
        confirmReset
    );

}

/* ===================================
   STARTUP CHECKS
=================================== */

function startup() {

    console.log(
        "%cCraftCalc v2.0 Loaded",
        "color:#5ee7ff;font-size:16px;"
    );

    console.log(
        "Level:",
        gameData.level
    );

    console.log(
        "Calculations:",
        gameData.calculations
    );

    console.log(
        "Theme:",
        gameData.currentTheme
    );

    if (
        typeof updateXPUI ===
        "function"
    ) {

        updateXPUI();

    }

    if (
        typeof updateStats ===
        "function"
    ) {

        updateStats();

    }

    if (
        typeof renderHistory ===
        "function"
    ) {

        renderHistory();

    }

    if (
        typeof renderAchievements ===
        "function"
    ) {

        renderAchievements();

    }

}

/* ===================================
   SECRET CONSOLE COMMANDS
=================================== */

window.craftcalc = {

    levelUp() {

        gameData.level++;

        saveGame();

        updateXPUI();

        updateStats();

    },

    addXP(amount = 100) {

        gameData.xp += amount;

        gameData.totalXP += amount;

        saveGame();

        updateXPUI();

        updateStats();

    },

    unlockAllAchievements() {

        if (
            typeof ACHIEVEMENTS ===
            "undefined"
        ) return;

        gameData.achievements =
            ACHIEVEMENTS.map(
                achievement =>
                achievement.id
            );

        saveGame();

        renderAchievements();

    },

    reset() {

        resetGame();

    }

};

/* ===================================
   WELCOME MESSAGE
=================================== */

window.addEventListener(
    "load",
    () => {

        startup();

        setTimeout(() => {

            showSystemMessage(
                "Welcome Engineer ⚡"
            );

        }, 600);

    }
);