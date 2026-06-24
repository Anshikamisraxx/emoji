const emoji = document.getElementById("emoji");
const scoreEl = document.getElementById("score");
const streakEl = document.getElementById("streak");
const sound = document.getElementById("tapSound");

let score = 0;
let streak = 0;
let lastTap = Date.now();

/* Emoji set */
const emojis = [
    "😄","😂","😍","😎","🤩","😜","😈",
    "😭","😡","😱","🤯",
    "👻","💀","🤖",
    "🐶","🐱","🦁",
    "🍕","🍔","🍟",
    "⚽","🎮","🎧",
    "❤️","🔥","✨","⚡","🌈"
];

function randomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

/* Explosion */
function explode(x, y) {
    for (let i = 0; i < 10; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.textContent = randomEmoji();

        const angle = Math.random() * 2 * Math.PI;
        const dist = 80 + Math.random() * 60;

        p.style.left = x + "px";
        p.style.top = y + "px";
        p.style.setProperty("--x", Math.cos(angle)*dist + "px");
        p.style.setProperty("--y", Math.sin(angle)*dist + "px");

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

/* Click */
emoji.addEventListener("click", (e) => {

    const now = Date.now();
    const diff = now - lastTap;

    // ⏱️ streak logic
    if (diff < 800) {
        streak++;
    } else {
        streak = 0;
    }

    lastTap = now;

    // 🎯 scoring
    score += 1 + Math.floor(streak / 3);

    // update UI
    scoreEl.textContent = score;
    streakEl.textContent = streak;

    // change emoji
    emoji.textContent = randomEmoji();

    // animation
    emoji.classList.add("animate");
    setTimeout(() => emoji.classList.remove("animate"), 200);

    // explosion
    explode(e.clientX, e.clientY);

    // sound
    sound.currentTime = 0;
    sound.play();

    // vibration
    if (navigator.vibrate) navigator.vibrate(50);
});
