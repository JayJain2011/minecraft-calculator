/* ===================================
   ACHIEVEMENTS SYSTEM
=================================== */

const achievementGrid =
    document.getElementById(
        "achievement-grid"
    );

const achievementPopup =
    document.getElementById(
        "achievement-popup"
    );

const achievementName =
    document.querySelector(
        ".achievement-name"
    );

/* ===================================
   DATABASE
=================================== */

const ACHIEVEMENTS = [

    {
        id: "first_craft",
        title: "First Craft",
        description:
            "Complete your first calculation"
    },

    {
        id: "stone_age",
        title: "Stone Age",
        description:
            "Complete 10 calculations"
    },

    {
        id: "redstone_engineer",
        title: "Redstone Engineer",
        description:
            "Complete 50 calculations"
    },

    {
        id: "master_engineer",
        title: "Master Engineer",
        description:
            "Reach Level 5"
    },

    {
        id: "scientist",
        title: "Scientific Terminal",
        description:
            "Reach Level 10"
    },

    {
        id: "analyst",
        title: "Redstone Analyst",
        description:
            "Reach Level 15"
    },

    {
        id: "ancient_builder",
        title: "Ancient Builder",
        description:
            "Reach Level 20"
    },

    {
        id: "stack_master",
        title: "Stack Master",
        description:
            "Discover the number 64"
    },

    {
        id: "elite_engineer",
        title: "Elite Engineer",
        description:
            "Discover 1337"
    },

    {
        id: "theme_unlock",
        title: "Theme Master",
        description:
            "Unlock themes"
    },

    {
        id: "history_unlock",
        title: "Memory Crystal",
        description:
            "Unlock history"
    }

];

/* ===================================
   ENSURE SAVE ARRAY
=================================== */

if (!gameData.achievements) {

    gameData.achievements = [];

}

/* ===================================
   POPUP
=================================== */

function showAchievementPopup(text) {

    if (!achievementPopup) return;

    achievementName.textContent =
        text;

    achievementPopup.classList.remove(
        "show"
    );

    void achievementPopup.offsetWidth;

    achievementPopup.classList.add(
        "show"
    );

    setTimeout(() => {

        achievementPopup.classList.remove(
            "show"
        );

    }, 4000);

}

/* ===================================
   UNLOCK
=================================== */

function unlockAchievement(
    id,
    customTitle = null
) {

    if (
        gameData.achievements.includes(id)
    ) {
        return;
    }

    gameData.achievements.push(id);

    saveGame();

    const achievement =
        ACHIEVEMENTS.find(
            a => a.id === id
        );

    const title =
        customTitle ||
        achievement?.title ||
        "Achievement";
        if (
    typeof playAchievementSound ===
    "function"
) {

    playAchievementSound();

}

    showAchievementPopup(title);

    renderAchievements();

}

/* ===================================
   AUTO CHECKS
=================================== */

function checkAchievements() {

    if (
        gameData.calculations >= 1
    ) {

        unlockAchievement(
            "first_craft"
        );

    }

    if (
        gameData.calculations >= 10
    ) {

        unlockAchievement(
            "stone_age"
        );

    }

    if (
        gameData.calculations >= 50
    ) {

        unlockAchievement(
            "redstone_engineer"
        );

    }

    if (
        gameData.level >= 5
    ) {

        unlockAchievement(
            "master_engineer"
        );

    }

}

/* ===================================
   RENDER
=================================== */

function renderAchievements() {

    if (!achievementGrid) return;

    achievementGrid.innerHTML = "";

    ACHIEVEMENTS.forEach(
        achievement => {

            const unlocked =
                gameData.achievements.includes(
                    achievement.id
                );

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "achievement-card";

            if (!unlocked) {

                card.classList.add(
                    "locked"
                );

            }

            card.innerHTML = `
                <h3>
                    ${achievement.title}
                </h3>

                <p>
                    ${achievement.description}
                </p>

                <span>
                    ${
                        unlocked
                        ? "UNLOCKED"
                        : "LOCKED"
                    }
                </span>
            `;

            achievementGrid.appendChild(
                card
            );

        }
    );

}

/* ===================================
   PANEL BUTTON
=================================== */

const achievementsButton =
    document.getElementById(
        "achievements-btn"
    );

const achievementsPanel =
    document.getElementById(
        "achievements-panel"
    );

if (
    achievementsButton &&
    achievementsPanel
) {

    achievementsButton
    .addEventListener(
        "click",
        () => {

            achievementsPanel
            .classList.toggle(
                "hidden"
            );

        }
    );

}

/* ===================================
   INIT
=================================== */

renderAchievements();

checkAchievements();