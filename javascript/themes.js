/* ===================================
   THEME SYSTEM
=================================== */

const themesPanel =
    document.getElementById(
        "themes-panel"
    );

const themesButton =
    document.getElementById(
        "themes-btn"
    );

const themeCards =
    document.querySelectorAll(
        ".theme-card"
    );

/* ===================================
   AVAILABLE THEMES
=================================== */

const THEMES = [

    "overworld",
    "nether",
    "end"

];

/* ===================================
   APPLY THEME
=================================== */

function applyTheme(theme) {

    THEMES.forEach(currentTheme => {

        document.body.classList.remove(
            currentTheme
        );

    });

    document.body.classList.add(
        theme
    );

    gameData.currentTheme =
        theme;

    saveGame();

    updateActiveThemeCard();

}

/* ===================================
   UPDATE ACTIVE CARD
=================================== */

function updateActiveThemeCard() {

    themeCards.forEach(card => {

        card.classList.remove(
            "active"
        );

        if (
            card.classList.contains(
                gameData.currentTheme
            )
        ) {

            card.classList.add(
                "active"
            );

        }

    });

}

/* ===================================
   LOAD SAVED THEME
=================================== */

function loadTheme() {

    const savedTheme =
        gameData.currentTheme ||
        "overworld";

    applyTheme(
        savedTheme
    );

}

/* ===================================
   THEME BUTTONS
=================================== */

themeCards.forEach(card => {

    card.addEventListener(
        "click",
        () => {

            if (
                card.classList.contains(
                    "overworld"
                )
            ) {

                applyTheme(
                    "overworld"
                );

            }

            else if (
                card.classList.contains(
                    "nether"
                )
            ) {

                applyTheme(
                    "nether"
                );

            }

            else if (
                card.classList.contains(
                    "end"
                )
            ) {

                applyTheme(
                    "end"
                );

            }

        }
    );

});

/* ===================================
   PANEL TOGGLE
=================================== */

if (
    themesButton &&
    themesPanel
) {

    themesButton.addEventListener(
        "click",
        () => {

            themesPanel.classList.toggle(
                "hidden"
            );

        }
    );

}

/* ===================================
   THEME TRANSITION
=================================== */

document.body.style.transition =
`
background 0.5s ease,
color 0.5s ease
`;

/* ===================================
   INIT
=================================== */

loadTheme();

updateActiveThemeCard();