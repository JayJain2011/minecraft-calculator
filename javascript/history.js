/* ===================================
   HISTORY SYSTEM
=================================== */

const historyPanel =
    document.getElementById(
        "history-panel"
    );

const historyGrid =
    document.getElementById(
        "history-grid"
    );

const historyButton =
    document.getElementById(
        "history-btn"
    );

/* ===================================
   TOGGLE PANEL
=================================== */

if (
    historyButton &&
    historyPanel
) {

    historyButton.addEventListener(
        "click",
        () => {

            historyPanel.classList.toggle(
                "hidden"
            );

        }
    );

}

/* ===================================
   LOAD EXPRESSION
=================================== */

function loadHistoryItem(index) {

    const item =
        gameData.history[index];

    if (!item) return;

    display.value =
        item.expression;

}

/* ===================================
   CREATE CRYSTAL
=================================== */

function createHistoryCrystal(
    item,
    index
) {

    const crystal =
        document.createElement("div");

    crystal.className =
        "history-item";

    crystal.innerHTML = `
        <div class="history-result">
            ◇ ${item.result}
        </div>

        <div class="history-expression">
            ${item.expression}
        </div>
    `;

    crystal.addEventListener(
        "click",
        () => {

            loadHistoryItem(index);

        }
    );

    return crystal;

}

/* ===================================
   RENDER
=================================== */

function renderHistory() {

    if (!historyGrid) return;

    historyGrid.innerHTML = "";

    if (
        gameData.history.length === 0
    ) {

        historyGrid.innerHTML =
        `
        <div class="empty-history">
            No Memory Crystals Yet
        </div>
        `;

        return;

    }

    gameData.history.forEach(
        (
            item,
            index
        ) => {

            const crystal =
                createHistoryCrystal(
                    item,
                    index
                );

            historyGrid.appendChild(
                crystal
            );

        }
    );

}

/* ===================================
   INIT
=================================== */

renderHistory();