const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const compChoiceImg = document.querySelector("#comp-choice-img");
const resetBtn = document.querySelector("#reset-btn");
const countdownEl = document.querySelector("#countdown");

// Sound effects
const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");

let userScore = 0;
let compScore = 0;

const getCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIndex = Math.floor(Math.random() * 3);
    return options[randIndex];
};

const getImageForChoice = (choice) => {
    return `${choice}2.jpg`;
};

const removeActiveClasses = () => {
    choices.forEach(choice => choice.classList.remove("active"));
};

const drawGame = () => {
    msg.innerText = "It's a Draw!";
    msg.style.backgroundColor = "#ffc107";
    drawSound.play();
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#4caf50";
        winSound.play();
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "#f44336";
        loseSound.play();
    }
};

const playGame = (userChoice) => {
    clickSound.play();
    removeActiveClasses();
    document.getElementById(userChoice).classList.add("active");

    msg.innerText = "";
    compChoiceImg.style.display = "none";
    countdownEl.innerText = "6";

    let count = 6;
    const countdownInterval = setInterval(() => {
        count--;
        countdownEl.innerText = count > 0 ? count : "";
        if (count <= 0) {
            clearInterval(countdownInterval);

            const compChoice = getCompChoice();
            compChoiceImg.src = getImageForChoice(compChoice);
            compChoiceImg.style.display = "block";

            if (userChoice === compChoice) {
                drawGame();
            } else {
                const userWin =
                    (userChoice === "rock" && compChoice === "scissor") ||
                    (userChoice === "paper" && compChoice === "rock") ||
                    (userChoice === "scissor" && compChoice === "paper");
                showWinner(userWin, userChoice, compChoice);
            }
        }
    }, 700); // 0.7s per count
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#222";
    compChoiceImg.style.display = "none";
    countdownEl.innerText = "";
    removeActiveClasses();
});
