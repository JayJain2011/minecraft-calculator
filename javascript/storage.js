/* ===================================
   CRAFTCALC STORAGE SYSTEM
=================================== */

const STORAGE_KEY = "craftcalc_save";

/* ===================================
   DEFAULT SAVE DATA
=================================== */

const defaultData = {

    level: 1,

    xp: 0,

    totalXP: 0,

    calculations: 0,

    highestResult: 0,

    currentTheme: "overworld",

    soundEnabled: true,

    history: [],

    achievements: []

};

/* ===================================
   LOAD DATA
=================================== */

function loadGame() {

    const save =
        localStorage.getItem(STORAGE_KEY);

    if (!save) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }

    try {

        return {
            ...defaultData,
            ...JSON.parse(save)
        };

    } catch {

        return structuredClone(defaultData);

    }

}

/* ===================================
   SAVE DATA
=================================== */

function saveGame() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(gameData)
    );

}

/* ===================================
   RESET DATA
=================================== */

function resetGame() {

    localStorage.removeItem(
        STORAGE_KEY
    );

    location.reload();

}

/* ===================================
   GLOBAL GAME DATA
=================================== */

let gameData = loadGame();