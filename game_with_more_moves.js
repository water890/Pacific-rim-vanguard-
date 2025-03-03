
// Game Setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Player (Jaeger) Object
const player = {
    x: 100,
    y: 250,
    width: 60,
    height: 100,
    speed: 5,
    dx: 0,
    attack: false,
    heavyAttack: false,
    kickAttack: false,
    jumpAttack: false,
    specialAttack: false,
    specialCooldown: 0
};

// Kaiju Enemy
const kaiju = {
    x: 600,
    y: 250,
    width: 80,
    height: 120,
    health: 100
};

// Mission System
let mission = {
    type: "Defeat the Kaiju",
    completed: false,
    timer: 60 // seconds
};

// Timer Countdown
setInterval(() => {
    if (mission.timer > 0 && !mission.completed) {
        mission.timer--;
    }
    if (player.specialCooldown > 0) {
        player.specialCooldown--;
    }
}, 1000);

// Controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") player.dx = player.speed;
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === " ") player.attack = true;
    if (e.key === "Shift") player.heavyAttack = true;
    if (e.key === "ArrowDown") player.kickAttack = true;
    if (e.key === "ArrowUp") player.jumpAttack = true;
    if (e.key === "Enter" && player.specialCooldown === 0) {
        player.specialAttack = true;
        player.specialCooldown = 5; // Cooldown for 5 seconds
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") player.dx = 0;
    if (e.key === " ") player.attack = false;
    if (e.key === "Shift") player.heavyAttack = false;
    if (e.key === "ArrowDown") player.kickAttack = false;
    if (e.key === "ArrowUp") player.jumpAttack = false;
    if (e.key === "Enter") player.specialAttack = false;
});

// Update Game State
function update() {
    player.x += player.dx;

    // Collision Detection for Attacks
    if (player.attack && Math.abs(player.x - kaiju.x) < 70) {
        kaiju.health -= 5; // Light Punch
        console.log("Kaiju Hit! Health:", kaiju.health);
    }
    if (player.heavyAttack && Math.abs(player.x - kaiju.x) < 70) {
        kaiju.health -= 10; // Heavy Punch
        console.log("Heavy Attack! Kaiju Health:", kaiju.health);
    }
    if (player.kickAttack && Math.abs(player.x - kaiju.x) < 80) {
        kaiju.health -= 8; // Kick Attack
        console.log("Kick Attack! Kaiju Health:", kaiju.health);
    }
    if (player.jumpAttack && Math.abs(player.x - kaiju.x) < 90) {
        kaiju.health -= 12; // Jump Attack
        console.log("Jump Attack! Kaiju Health:", kaiju.health);
    }
    if (player.specialAttack && Math.abs(player.x - kaiju.x) < 100) {
        kaiju.health -= 20; // Plasma Slash
        console.log("Special Attack! Kaiju Health:", kaiju.health);
        player.specialAttack = false; // Reset after one hit
    }

    // Mission Completion Check
    if (kaiju.health <= 0) {
        mission.completed = true;
    }

    draw();
    requestAnimationFrame(update);
}

// Draw Function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Special Attack Effect
    if (player.specialAttack) {
        ctx.fillStyle = "cyan";
        ctx.fillRect(player.x - 10, player.y, player.width + 20, player.height);
    }

    // Draw Kaiju
    if (kaiju.health > 0) {
        ctx.fillStyle = "red";
        ctx.fillRect(kaiju.x, kaiju.y, kaiju.width, kaiju.height);
    }

    // Draw Mission Info
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Mission: " + mission.type, 20, 30);
    ctx.fillText("Time Left: " + mission.timer, 20, 60);

    // Draw Special Attack Cooldown
    ctx.fillText("Special Cooldown: " + player.specialCooldown, 20, 90);

    // Draw Kaiju Health
    ctx.fillText("Kaiju HP: " + kaiju.health, kaiju.x, kaiju.y - 10);

    // Mission Completed Message
    if (mission.completed) {
        ctx.fillStyle = "yellow";
        ctx.font = "30px Arial";
        ctx.fillText("MISSION COMPLETE!", canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Start Game Loop
update();
