window.onload = function () {

    const emoji = document.getElementById("emoji");
    const scoreEl = document.getElementById("score");
    const streakEl = document.getElementById("streak");

    let score = 0;
    let streak = 0;
    let lastTap = Date.now();

    const emojis = ["😄","😂","😍","😎","🤩","😜","😈","😭","😡","😱","🤯","👻","💀","🤖","🐶","🐱","🦁","🍕","🍔","🍟","⚽","🎮","🎧","❤️","🔥","✨","⚡","🌈"];

    function randomEmoji() {
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    function explode(x, y) {
        for (let i = 0; i < 8; i++) {
            const p = document.createElement("div");
            p.className = "particle";
            p.textContent = randomEmoji();

            const angle = Math.random() * 2 * Math.PI;
            const dist = 80 + Math.random() * 40;

            p.style.left = x + "px";
            p.style.top = y + "px";
            p.style.setProperty("--x", Math.cos(angle)*dist + "px");
            p.style.setProperty("--y", Math.sin(angle)*dist + "px");

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 800);
        }
    }

    emoji.addEventListener("click", (e) => {

        console.log("clicked"); // 👈 DEBUG

        const now = Date.now();
        const diff = now - lastTap;

        if (diff < 800) {
            streak++;
        } else {
            streak = 0;
        }

        lastTap = now;

        score += 1 + Math.floor(streak / 3);

        scoreEl.textContent = score;
        streakEl.textContent = streak;

        emoji.textContent = randomEmoji();

        emoji.classList.add("animate");
        setTimeout(() => emoji.classList.remove("animate"), 200);

        explode(e.clientX, e.clientY);

        if (navigator.vibrate) navigator.vibrate(50);
    });

};
