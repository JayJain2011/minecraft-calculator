/* ===================================
   XP SYSTEM
=================================== */

const xpBar =
    document.querySelector(".xp-bar");

const levelText =
    document.querySelector(".level-text");

const xpPopup =
    document.getElementById("xp-popup");

/* ===================================
   XP SETTINGS
=================================== */

const XP_PER_LEVEL = 100;

/* ===================================
   UPDATE XP UI
=================================== */

function updateXPUI() {

    const progress =
        (gameData.xp / XP_PER_LEVEL) * 100;

    xpBar.style.width =
        `${progress}%`;

    levelText.textContent =
        `Level ${gameData.level} Engineer`;

}

/* ===================================
   XP POPUP
=================================== */

function showXPPopup(amount) {

    if (!xpPopup) return;

    xpPopup.textContent =
        `+${amount} XP`;

    xpPopup.classList.remove("show");

    void xpPopup.offsetWidth;

    xpPopup.classList.add("show");

    setTimeout(() => {

        xpPopup.classList.remove(
            "show"
        );

    }, 1200);

}

/* ===================================
   LEVEL UP
=================================== */

function levelUp() {

    gameData.level++;

    if (
    typeof playLevelUpSound ===
    "function"
) {

    playLevelUpSound();

}

    saveGame();

    updateXPUI();

    levelText.classList.add(
        "level-up"
    );

    setTimeout(() => {

        levelText.classList.remove(
            "level-up"
        );

    }, 800);

    if (
        typeof showAchievementPopup ===
        "function"
    ) {

        showAchievementPopup(
            `Level ${gameData.level}`
        );

    }

    checkLevelUnlocks();

}

/* ===================================
   XP REWARD LOGIC
=================================== */

function awardXP(result) {

    let xpEarned = 10;

    if (Math.abs(result) >= 100) {

        xpEarned += 2;

    }

    if (Math.abs(result) >= 1000) {

        xpEarned += 5;

    }

    if (Math.abs(result) >= 10000) {

        xpEarned += 10;

    }

    gameData.xp += xpEarned;

    gameData.totalXP += xpEarned;

    showXPPopup(xpEarned);

    while (
        gameData.xp >= XP_PER_LEVEL
    ) {

        gameData.xp -= XP_PER_LEVEL;

        levelUp();

    }

    saveGame();

    updateXPUI();

}

/* ===================================
   UNLOCKS
=================================== */

function checkLevelUnlocks() {

    switch (gameData.level) {

        case 3:

            if (
                typeof unlockAchievement ===
                "function"
            ) {

                unlockAchievement(
                    "history_unlock",
                    "History Unlocked"
                );

            }

            break;

        case 5:

            if (
                typeof unlockAchievement ===
                "function"
            ) {

                unlockAchievement(
                    "theme_unlock",
                    "Theme Master"
                );

            }

            break;

        case 10:

            if (
                typeof unlockAchievement ===
                "function"
            ) {

                unlockAchievement(
                    "scientist",
                    "Scientific Terminal"
                );

            }

            break;

        case 15:

            if (
                typeof unlockAchievement ===
                "function"
            ) {

                unlockAchievement(
                    "analyst",
                    "Redstone Analyst"
                );

            }

            break;

        case 20:

            if (
                typeof unlockAchievement ===
                "function"
            ) {

                unlockAchievement(
                    "ancient_builder",
                    "Ancient Builder"
                );

            }

            break;

    }

}

/* ===================================
   INIT
=================================== */

updateXPUI();