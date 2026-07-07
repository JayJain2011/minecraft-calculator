/* ===================================
   PARTICLE ENGINE
=================================== */

const canvas =
    document.getElementById(
        "particle-canvas"
    );

const ctx =
    canvas.getContext("2d");

/* ===================================
   SETTINGS
=================================== */

const PARTICLE_COUNT = 70;

const particles = [];

/* ===================================
   RESIZE
=================================== */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ===================================
   PARTICLE CLASS
=================================== */

class Particle {

    constructor() {

        this.reset();

    }

    reset() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 3 + 1;

        this.speedY =
            Math.random() * 0.6 + 0.2;

        this.speedX =
            (Math.random() - 0.5) *
            0.3;

        this.alpha =
            Math.random() * 0.8 + 0.2;

    }

    update() {

        this.y -=
            this.speedY;

        this.x +=
            this.speedX;

        if (
            this.y < -10
        ) {

            this.y =
                canvas.height + 10;

            this.x =
                Math.random() *
                canvas.width;

        }

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,50,50,${this.alpha})`;

        ctx.fill();

    }

}

/* ===================================
   CREATE PARTICLES
=================================== */

function createParticles() {

    particles.length = 0;

    for (
        let i = 0;
        i < PARTICLE_COUNT;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}

/* ===================================
   CONNECTIONS
=================================== */

function drawConnections() {

    for (
        let a = 0;
        a < particles.length;
        a++
    ) {

        for (
            let b = a + 1;
            b < particles.length;
            b++
        ) {

            const dx =
                particles[a].x -
                particles[b].x;

            const dy =
                particles[a].y -
                particles[b].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (
                distance < 120
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.strokeStyle =
                `rgba(
                    255,
                    70,
                    70,
                    ${
                        0.12 -
                        distance / 1000
                    }
                )`;

                ctx.stroke();

            }

        }

    }

}

/* ===================================
   ANIMATE
=================================== */

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );

    drawConnections();

    requestAnimationFrame(
        animateParticles
    );

}

/* ===================================
   MOUSE GLOW
=================================== */

let mouseX = 0;
let mouseY = 0;

window.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);

function drawMouseGlow() {

    ctx.beginPath();

    const gradient =
        ctx.createRadialGradient(
            mouseX,
            mouseY,
            0,
            mouseX,
            mouseY,
            120
        );

    gradient.addColorStop(
        0,
        "rgba(255,80,80,.20)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,80,80,0)"
    );

    ctx.fillStyle =
        gradient;

    ctx.arc(
        mouseX,
        mouseY,
        120,
        0,
        Math.PI * 2
    );

    ctx.fill();

}

/* ===================================
   ENHANCED LOOP
=================================== */

function render() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );

    drawConnections();

    drawMouseGlow();

    requestAnimationFrame(
        render
    );

}

/* ===================================
   INIT
=================================== */

createParticles();

render();