document.addEventListener('DOMContentLoaded', () => {
    // Game data now includes an 'audio' property for each npcMessage
    const gameData = [
        {
            npcMessage: { 
                text: "🌍 Good morning! May I see your passport, please?", 
                audio: "airport_greeting.wav" 
            },
            options: [
                { text: "Here you go!", score: 10, feedback: "✅ Perfect! You sound polite and confident!" },
                { text: "Here you are!", score: 10, feedback: "✅ Great! Native speakers say this too!" },
                { text: "Yes, I have.", score: 0, feedback: "💡 Almost! But we usually say ‘Here you go!’ when giving something." },
                { text: "Thank you!", score: 0, feedback: "💡 That’s polite, but the officer asked for your passport. Try ‘Here you go!’ next time." }
            ]
        },
        {
            npcMessage: { 
                text: "✈️ Hi! Is this your first time abroad?", 
                audio: "inflight_question.wav" 
            },
            options: [
                { text: "Yes! I’m so excited!", score: 10, feedback: "✅ Awesome! Your energy is contagious!" },
                { text: "Yes, it is!", score: 10, feedback: "✅ Clear and natural! Well done!" },
                { text: "No, I go many time.", score: 0, feedback: "💡 Nice try! Correct: ‘No, I’ve been abroad many times.’" },
                { text: "I don’t know.", score: 0, feedback: "💡 Hmm, you know if it’s your first time! Try ‘Yes!’ or ‘No!’ with a smile." }
            ]
        },
        {
            npcMessage: { 
                text: "☕ Hi there! Are you ready to order?", 
                audio: "cafe_order.wav" 
            },
            options: [
                { text: "I’ll have a latte, please.", score: 10, feedback: "✅ Perfect! Polite and natural." },
                { text: "I’d like a coffee, please.", score: 10, feedback: "✅ Excellent! This is how natives order." },
                { text: "Give me coffee.", score: 0, feedback: "💡 Ouch! Sounds rude. Always add ‘please’ and use ‘I’d like…’" },
                { text: "I want drink.", score: 0, feedback: "💡 Close! Say: ‘I’d like a drink, please.’" }
            ]
        },
        {
            npcMessage: { 
                text: "🗺️ You're lost! How do you ask for directions?", 
                audio: "directions_intro.wav" 
            },
            options: [
                { text: "Excuse me, how can I get to the subway station?", score: 10, feedback: "✅ Perfect! ‘Excuse me’ is the magic phrase!" },
                { text: "Could you tell me where the station is?", score: 10, feedback: "✅ Very polite! British people love this phrase." },
                { text: "Where subway?", score: 0, feedback: "💡 Too short! Say: ‘Where is the subway station?’" },
                { text: "Station please.", score: 0, feedback: "💡 Not clear. Always start with ‘Excuse me’ and use full sentences." }
            ]
        }
    ];

    const messageList = document.getElementById('message-list');
    const optionsContainer = document.getElementById('options-container');

    let currentSceneIndex = 0;
    let score = 0;
    let isWaitingForUser = false;

    // NEW function to play audio
    function playAudio(filename) {
        if (!filename) return;
        const audio = new Audio(`audio/${filename}`);
        audio.play().catch(error => console.error("Error playing audio:", error));
    }

    // MODIFIED displayMessage function
    function displayMessage(text, type, audioFile = null) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}-message`;
        messageElement.innerHTML = text;
        
        // If it's an NPC message with audio, make it clickable
        if (type === 'npc' && audioFile) {
            messageElement.classList.add('clickable-audio');
            messageElement.onclick = () => playAudio(audioFile);
        }
        
        messageList.appendChild(messageElement);
        messageList.scrollTop = messageList.scrollHeight;
    }

    function displayOptions(options) {
        optionsContainer.innerHTML = '';
        options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.onclick = () => selectOption(option);
            optionsContainer.appendChild(button);
        });
        isWaitingForUser = true;
    }

    function selectOption(option) {
        if (!isWaitingForUser) return;
        isWaitingForUser = false;

        optionsContainer.innerHTML = '';
        
        displayMessage(option.text, 'user');
        score += option.score;

        setTimeout(() => {
            displayMessage(option.feedback, 'feedback');
            
            setTimeout(() => {
                currentSceneIndex++;
                if (currentSceneIndex < gameData.length) {
                    startScene(currentSceneIndex);
                } else {
                    showSummary();
                }
            }, 1500);
        }, 800);
    }

    function showSummary() {
        const summaryText = `🌟 **สรุปวันแรกของคุณ!** <br><br> คะแนนรวม: **${score}/40** <br><br> คุณได้เรียนรู้ทักษะสำคัญในการสื่อสารแล้ว!`;
        displayMessage(summaryText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'), 'summary');

        const restartButton = document.createElement('button');
        restartButton.className = 'option-button';
        restartButton.textContent = 'เล่นอีกครั้ง';
        restartButton.onclick = restartGame;
        optionsContainer.appendChild(restartButton);
    }

    function restartGame() {
        messageList.innerHTML = '';
        optionsContainer.innerHTML = '';
        currentSceneIndex = 0;
        score = 0;
        startScene(currentSceneIndex);
    }

    function startScene(index) {
        const scene = gameData[index];
        setTimeout(() => {
            // Pass the text and audio filename to the displayMessage function
            displayMessage(scene.npcMessage.text, 'npc', scene.npcMessage.audio);
            setTimeout(() => {
                displayOptions(scene.options);
            }, 1000);
        }, 500);
    }

    // Start the game
    startScene(currentSceneIndex);
});
