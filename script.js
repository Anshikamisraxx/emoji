const characters = document.querySelectorAll(".character");
const pupils = document.querySelectorAll(".pupil");
const eyes = document.querySelectorAll(".eye");

let memory = [0, 0, 0];
let moods = ["happy", "happy", "happy"];

/* 👁️ Eye tracking */
document.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
        const rect = pupil.parentElement.getBoundingClientRect();

        const dx = e.clientX - (rect.left + rect.width/2);
        const dy = e.clientY - (rect.top + rect.height/2);

        pupil.style.transform = `translate(${dx/20}px, ${dy/20}px)`;
    });
});

/* 👁️ Blinking */
setInterval(() => {
    eyes.forEach(eye => {
        eye.classList.add("blink");
        setTimeout(() => eye.classList.remove("blink"), 150);
    });
}, 3000);

/* 🎭 Mood logic */
function updateMoods() {
    moods = moods.map((m, i) => {
        if (memory[i] < 3) return "happy";
        if (memory[i] < 6) return "sad";
        return "angry";
    });
}

/* 🎬 Render */
function render() {
    characters.forEach((char, i) => {
        const face = char.querySelector(".face");

        face.classList.remove("happy", "sad", "angry");
        face.classList.add(moods[i]);

        /* talking effect */
        char.classList.add("talk");
        setTimeout(() => char.classList.remove("talk"), 300);
    });
}

/* 🎮 Click */
characters.forEach((char, i) => {
    char.addEventListener("click", () => {
        memory[i]++;
        updateMoods();
        render();
    });
});

/* 💬 Auto life */
setInterval(() => {
    const i = Math.floor(Math.random() * 3);
    memory[i]++;
    updateMoods();
    render();
}, 2000);
