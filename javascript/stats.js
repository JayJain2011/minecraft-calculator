/* ===================================
   STATS SYSTEM
=================================== */

const statsPanel =
    document.getElementById(
        "stats-panel"
    );

const statsButton =
    document.getElementById(
        "stats-btn"
    );

const statCalculations =
    document.getElementById(
        "stat-calculations"
    );

const statHighest =
    document.getElementById(
        "stat-highest"
    );

const statLevel =
    document.getElementById(
        "stat-level"
    );

const statXP =
    document.getElementById(
        "stat-xp"
    );

/* ===================================
   TOGGLE PANEL
=================================== */

if (
    statsButton &&
    statsPanel
) {

    statsButton.addEventListener(
        "click",
        () => {

            statsPanel.classList.toggle(
                "hidden"
            );

            updateStats();

        }
    );

}

/* ===================================
   UPDATE STATS
=================================== */

function updateStats() {

    if (
        !statCalculations ||
        !statHighest ||
        !statLevel ||
        !statXP
    ) {
        return;
    }

    statCalculations.textContent =
        gameData.calculations || 0;

    statHighest.textContent =
        gameData.highestResult || 0;

    statLevel.textContent =
        gameData.level || 1;

    statXP.textContent =
        gameData.totalXP || 0;

}

/* ===================================
   EXTRA STATS HELPERS
=================================== */

function getPlayerRank() {

    const level =
        gameData.level;

    if (level >= 20)
        return "Ancient Builder";

    if (level >= 15)
        return "Redstone Analyst";

    if (level >= 10)
        return "Scientist";

    if (level >= 5)
        return "Master Engineer";

    if (level >= 3)
        return "Engineer";

    return "Novice";

}

/* ===================================
   INIT
=================================== */

updateStats();