const characters = document.querySelectorAll(".character");
const pupils = document.querySelectorAll(".pupil");
const texts = document.querySelectorAll(".speech");

let memory = [0, 0, 0];
let moods = ["happy", "happy", "happy"];

/* 👁️ Eye tracking */
document.addEventListener("mousemove", (e) => {
    pupils.forEach((pupil) => {
        const rect = pupil.parentElement.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        pupil.style.transform = `translate(${x/20}px, ${y/20}px)`;
    });
});

/* 🎭 Personality */
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

        texts[i].textContent = moods[i];
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
