const characters = document.querySelectorAll(".character");
const texts = document.querySelectorAll(".speech");

/* 🧠 State */
let memory = [0, 0, 0];
let moods = ["happy", "happy", "happy"];

/* 💬 Dialogues */
const dialogues = {
    happy: ["Hi 😄", "Nice vibes ✨", "Chill 😌"],
    sad: ["I'm tired 😢", "Why 😔", "This hurts 😭"],
    angry: ["STOP 😡", "ENOUGH 😤", "I'M MAD 😠"]
};

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* 🎭 Personality logic */
function updateMoods() {
    moods = moods.map((m, i) => {
        if (i === 0) {
            if (memory[i] < 4) return "happy";
            if (memory[i] < 7) return "sad";
            return "angry";
        }
        if (i === 1) {
            if (memory[i] < 2) return "happy";
            if (memory[i] < 4) return "sad";
            return "angry";
        }
        if (i === 2) {
            if (memory[i] < 2) return "happy";
            return "angry";
        }
    });
}

/* 🔗 Influence */
function applyInfluence() {
    if (moods.includes("angry")) {
        memory = memory.map((m, i) =>
            moods[i] === "angry" ? m : m + 1
        );
    }

    if (moods.every(m => m === "happy")) {
        memory = memory.map(m => Math.max(0, m - 1));
    }
}

/* 🎬 Screen shake */
function shakeScreen() {
    document.body.style.transform = "translate(5px)";
    setTimeout(() => {
        document.body.style.transform = "translate(-5px)";
    }, 50);
    setTimeout(() => {
        document.body.style.transform = "translate(0px)";
    }, 100);
}

/* 🌈 Background */
function updateBackground() {
    if (moods.includes("angry")) {
        document.body.style.background = "radial-gradient(circle, #330000, #000)";
        shakeScreen();
    } else if (moods.includes("sad")) {
        document.body.style.background = "radial-gradient(circle, #001f3f, #000)";
    } else {
        document.body.style.background = "radial-gradient(circle, #0f0f0f, #000)";
    }
}

/* 🎬 Render */
function render() {
    characters.forEach((char, i) => {
        const face = char.querySelector(".face");

        face.classList.remove("happy", "sad", "angry");
        face.classList.add(moods[i]);

        texts[i].textContent = random(dialogues[moods[i]]);
    });

    updateBackground();
}

/* 🎮 Click */
characters.forEach((char, index) => {
    char.addEventListener("click", () => {
        memory[index]++;
        updateMoods();
        applyInfluence();
        render();
    });
});

/* 💬 Auto conversation */
setInterval(() => {
    const i = Math.floor(Math.random() * 3);
    memory[i]++;
    updateMoods();
    applyInfluence();
    render();
}, 2000);

/* ⏳ Cooldown */
setInterval(() => {
    memory = memory.map(m => Math.max(0, m - 1));
    updateMoods();
    render();
}, 4000);
