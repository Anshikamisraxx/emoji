const emojis = document.querySelectorAll(".face");
const pupils = document.querySelectorAll(".pupil");
const texts = document.querySelectorAll(".speech");

/* 👁️ Eye tracking */
document.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
        const rect = pupil.parentElement.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

        const x = Math.cos(angle) * 8;
        const y = Math.sin(angle) * 8;

        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/* 🧠 SYSTEM STATE */
let memory = [0, 0, 0];
let moods = ["happy", "happy", "happy"];

/* Dialogues */
const dialogues = {
    happy: ["All good 😄", "Chill 😌", "Nice vibes ✨"],
    sad: ["I'm down 😢", "This hurts 😔", "Why 😭"],
    angry: ["STOP 😡", "ENOUGH 😤", "I'M MAD 😠"]
};

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* 🎭 Click interaction */
emojis.forEach((emoji, index) => {
    emoji.addEventListener("click", () => {

        memory[index]++;

        // Personality
        emojis.forEach((e, i) => {

            if (i === 0) {
                if (memory[i] < 4) moods[i] = "happy";
                else if (memory[i] < 7) moods[i] = "sad";
                else moods[i] = "angry";
            }

            if (i === 1) {
                if (memory[i] < 2) moods[i] = "happy";
                else if (memory[i] < 4) moods[i] = "sad";
                else moods[i] = "angry";
            }

            if (i === 2) {
                if (memory[i] < 2) moods[i] = "happy";
                else moods[i] = "angry";
            }

        });

        applyEffects();
    });
});

/* 🔗 Influence + Chain reaction */
function applyEffects() {

    let newMoods = [...moods];

    for (let i = 0; i < moods.length; i++) {

        if (moods[i] === "angry") {
            newMoods = newMoods.map((m, idx) =>
                idx === i ? "angry" : "sad"
            );
        }

        else if (moods[i] === "sad") {
            newMoods = newMoods.map((m) =>
                m === "happy" ? "sad" : m
            );
        }

        else if (moods[i] === "happy") {
            newMoods = newMoods.map((m) =>
                m === "sad" ? "happy" : m
            );
        }
    }

    moods = newMoods;

    emojis.forEach((e, i) => {
        e.classList.remove("happy", "sad", "angry");
        e.classList.add(moods[i]);
        texts[i].textContent = random(dialogues[moods[i]]);
    });
}

/* ⏳ Cooldown system */
setInterval(() => {

    for (let i = 0; i < memory.length; i++) {
        if (memory[i] > 0) memory[i]--;

        if (memory[i] < 2) moods[i] = "happy";
        else if (memory[i] < 5) moods[i] = "sad";
    }

    applyEffects();

}, 3000);