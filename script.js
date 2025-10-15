let currentScene = 1;
let score = 0;
const totalScenes = 4; // จำนวนฉากที่มีคำถาม

const feedbackBox = document.getElementById('feedback-box');
const feedbackText = document.getElementById('feedback-text');
const nextButton = document.getElementById('next-button');

function showScene(sceneNumber) {
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.add('hidden');
    });
    document.getElementById(`scene-${sceneNumber}`).classList.remove('hidden');
}

function selectAnswer(points, feedback) {
    score += points;
    feedbackText.textContent = feedback;
    feedbackBox.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    feedbackBox.classList.add('hidden');
    currentScene++;
    if (currentScene > totalScenes) {
        document.getElementById('final-score').textContent = score;
        showScene(5); // ไปยังหน้าสรุป
    } else {
        showScene(currentScene);
    }
});

function restartGame() {
    currentScene = 1;
    score = 0;
    showScene(1);
}

// เริ่มเกม
showScene(1);
