
let userName = prompt("Enter your Name") || "Player";

const questions = [
    {
        que: "What does HTML stand for?",
        a: "Home Tool Markup Language",
        b: "Hyper Text Markup Language",
        c: "Hypelinks and Text Markup Language",
        d: "Hyper Typing Making Language",
        correct: "b",
    },
    {
        que: "Choose the correct HTML element for the largest heading:",
        a: "<head>",
        b: "<h6>",
        c: "<h1>",
        d: "<heading>",
        correct: "c",
    },
    {
        que: "What is the correct HTML element for inserting a line break?",
        a: "<br>",
        b: "<lb>",
        c: "<hr>",
        d: "<break>",
        correct: "a",
    },
    {
        que: "Choose the correct HTML element to define emphasized text",
        a: "<i>",
        b: "<b>",
        c: "<em>",
        d: "<italic>",
        correct: "c",
    },
    {
        que: "Which character is used to indicate an end tag?",
        a: "<",
        b: "*",
        c: "/",
        d: ">",
        correct: "c",
    },
    {
        que: "Choose the correct HTML element for the smallest heading:",
        a: "<head>",
        b: "<h6>",
        c: "<h1>",
        d: "<heading>",
        correct: "b",
    },
    {
        que: "What is the correct HTML Entity for inserting a white space?",
        a: "&lt;",
        b: "&copy;",
        c: "&nbsp;",
        d: "&arrow;",
        correct: "c",
    },
    {
        que: "Choose the correct HTML element for the Paragraph:",
        a: "<li>",
        b: "<s>",
        c: "<section>",
        d: "<p>",
        correct: "d",
    },
    {
        que: "Which of these elements are all <table> elements?",
        a: "<table> <head> <tfoot>",
        b: "<table> <tr> <td>",
        c: "<thead> <tbody> <tr>",
        d: "<table> <tr> <tt>",
        correct: "b",
    },
    {
        que: "How can you make a numbered list?",
        a: "<list>",
        b: "<ol>",
        c: "<ul>",
        d: "<dl>",
        correct: "b",
    },
    {
        que: "How can you make a bulleted list?",
        a: "<list>",
        b: "<ol>",
        c: "<ul>",
        d: "<dl>",
        correct: "c",
    },
    {
        que: "What is the correct HTML for making a drop-down list?",
        a: "<select>",
        b: "<list>",
        c: "<dropdown>",
        d: "<dl>",
        correct: "a",
    }
    
];

let index = 0;
let total = questions.length;
let right = 0, wrong = 0;

const headQue = document.getElementById("headQue");
const optionInputs = document.querySelectorAll(".options");
const timerDisplay = document.getElementById("timer");

let timer;
let timeLimit = 7 * 60; // 7 minutes in seconds
let lastUpdate = Date.now();

const startGlobalTimer = () => {
    let time = timeLimit;
    updateTimerDisplay(time);

    timer = setInterval(() => {
        const now = Date.now();
        const elapsed = now - lastUpdate;
        
        if (elapsed >= 200) { // Update every 200ms for faster countdown
            time = Math.max(0, time - (elapsed/1000));
            lastUpdate = now;
            
            updateTimerDisplay(time);
            
            if (time <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }
    }, 16);
};

const updateTimerDisplay = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    
    timerDisplay.innerHTML = `
        <div class="clock-face">
            <span class="time-digit">${mins.toString().padStart(2, "0").charAt(0)}</span>
            <span class="time-digit">${mins.toString().padStart(2, "0").charAt(1)}</span>
            <span class="time-separator">:</span>
            <span class="time-digit">${secs.toString().padStart(2, "0").charAt(0)}</span>
            <span class="time-digit">${secs.toString().padStart(2, "0").charAt(1)}</span>
        </div>
    `;
    
    // Visual effects when time is running low
    if (seconds <= 60) {
        timerDisplay.style.color = '#ff0000';
        timerDisplay.style.animation = seconds <= 30 ? 'pulse 0.5s infinite alternate' : 'none';
    }
};

const loadQuestion = () => {
    if (index === total) return endQuiz();
    
    resetQuiz();
    const data = questions[index];
    headQue.innerText = `${index + 1}) ${data.que}`;
    optionInputs[0].nextElementSibling.innerText = data.a;
    optionInputs[1].nextElementSibling.innerText = data.b;
    optionInputs[2].nextElementSibling.innerText = data.c;
    optionInputs[3].nextElementSibling.innerText = data.d;
};

const submitQuiz = () => {
    const data = questions[index];
    const ans = getAnswer();
    
    if (!ans) {
        alert("Please select an answer.");
        return;
    }
    
    ans === data.correct ? right++ : wrong++;
    index++;
    loadQuestion();
};

const getAnswer = () => {
    let ans;
    optionInputs.forEach((input) => {
        if (input.checked) ans = input.value;
    });
    return ans;
};

const resetQuiz = () => {
    optionInputs.forEach((input) => {
        input.checked = false;
    });
};

const endQuiz = () => {
    clearInterval(timer);
    document.getElementById("box").innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h2>Quiz Completed!</h2>
            <h3>Player: ${userName}</h3>
            <div style="margin-top:20px; background:#f0f8ff; padding: 20px; border-radius: 10px;">
                <h2>📊 Final Score</h2>
                <h4>${right} / ${total} correct answers</h4>
                <h4 style="color:${right >= total / 2 ? 'green' : 'red'};">
                    ${right >= total / 2 ? '👏 Well done!' : '❌ Try again!'}
                </h4>
            </div>
        </div>`;
};

// Start quiz
loadQuestion();
startGlobalTimer();