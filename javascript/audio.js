/* ===================================
   AUDIO SYSTEM
=================================== */

let audioContext = null;

/* ===================================
   CREATE CONTEXT
=================================== */

function initAudio() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

}

/* ===================================
   PLAY TONE
=================================== */

function playTone(
    frequency,
    duration,
    type = "square",
    volume = 0.05
) {

    if (
        !gameData.soundEnabled
    ) {
        return;
    }

    initAudio();

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.type =
        type;

    oscillator.frequency.value =
        frequency;

    gainNode.gain.value =
        volume;

    oscillator.connect(
        gainNode
    );

    gainNode.connect(
        audioContext.destination
    );

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime +
        duration
    );

    oscillator.stop(
        audioContext.currentTime +
        duration
    );

}

/* ===================================
   CLICK SOUND
=================================== */

function playClickSound() {

    playTone(
        300,
        0.05,
        "square",
        0.03
    );

}

/* ===================================
   CALCULATION SOUND
=================================== */

function playCraftSound() {

    playTone(
        500,
        0.08,
        "square",
        0.05
    );

    setTimeout(() => {

        playTone(
            700,
            0.08,
            "square",
            0.05
        );

    }, 50);

}

/* ===================================
   ACHIEVEMENT SOUND
=================================== */

function playAchievementSound() {

    playTone(
        600,
        0.12,
        "triangle",
        0.06
    );

    setTimeout(() => {

        playTone(
            800,
            0.12,
            "triangle",
            0.06
        );

    }, 80);

    setTimeout(() => {

        playTone(
            1000,
            0.12,
            "triangle",
            0.06
        );

    }, 160);

}

/* ===================================
   LEVEL UP SOUND
=================================== */

function playLevelUpSound() {

    playTone(
        500,
        0.10,
        "triangle",
        0.07
    );

    setTimeout(() => {

        playTone(
            750,
            0.10,
            "triangle",
            0.07
        );

    }, 100);

    setTimeout(() => {

        playTone(
            1000,
            0.15,
            "triangle",
            0.07
        );

    }, 200);

}

/* ===================================
   TOGGLE SOUND
=================================== */

const soundToggle =
    document.getElementById(
        "sound-toggle"
    );

if (soundToggle) {

    soundToggle.addEventListener(
        "click",
        () => {

            gameData.soundEnabled =
                !gameData.soundEnabled;

            saveGame();

            updateSoundButton();

            if (
                gameData.soundEnabled
            ) {

                playClickSound();

            }

        }
    );

}

/* ===================================
   UPDATE BUTTON
=================================== */

function updateSoundButton() {

    if (!soundToggle) return;

    soundToggle.textContent =
        gameData.soundEnabled
        ? "🔊 SOUND"
        : "🔇 SOUND";

}

/* ===================================
   INIT USER INTERACTION
=================================== */

document.addEventListener(
    "click",
    () => {

        initAudio();

    },
    { once:true }
);

/* ===================================
   INIT
=================================== */

updateSoundButton();