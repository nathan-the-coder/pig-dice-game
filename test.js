console.log("Welcome to Pig!")

// Connecting DOM
const rollBtn = document.getElementById("rollBtn");
const holdBtn = document.getElementById("holdBtn");
const resetBtn = document.getElementById("resetBtn");

const player1Current = document.getElementById("player1Current");
const player2Current = document.getElementById("player2Current");

const total1 = document.getElementById("total1");
const total2 = document.getElementById("total2");

const playerCards = document.querySelectorAll(".player-card");

const shakeAndRollSound = new Audio("./sounds/shaking_and_rolling_dice.mp3")

// Declare states  for the Game
let player1Score = 0;
let player2Score = 0;
let currentScore = 0;
let isPlayerOneTurn = true;
let gameOver = false;


function showDiceFace(number) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot) => (dot.style.opacity = "0"));

  const dotCombinations = {
    1: ["dot1"],
    2: ["dot2", "dot3"],
    3: ["dot1", "dot2", "dot3"],
    4: ["dot2", "dot3", "dot4", "dot5"],
    5: ["dot1", "dot2", "dot3", "dot4", "dot5"],
    6: ["dot2", "dot3", "dot4", "dot5", "dot6", "dot7"]
  };

  if (dotCombinations[number]) {
    dotCombinations[number].forEach((className) => {
      const dot = document.querySelector(`.${className}`);
      if (dot) {
        dot.style.opacity = "1";
      }
    });
  }
}

const dice = document.getElementById("dice");
// Build Dice Roll
function rollDice() {
  if (gameOver) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  dice.style.animation = "shake 0.5s";
  shakeAndRollSound.play();
  setTimeout(() => {
    dice.style.animation = "";
    showDiceFace(roll);
  }, 500);
  shakeAndRollSound.stop();
  console.log("Dice rolled: ", roll);

  if (roll == 1) {
    currentScore = 0;
    // Switch player
    switchPlayer();
  } else {
    currentScore += roll;
  }

  // Update display
  updateDisplay();
}



// Player Hold
function hold() {
  if (gameOver) return; 

  if (isPlayerOneTurn) {
    player1Score += currentScore;
  } else {
    player2Score += currentScore;
  }

  if (player1Score >= 25 || player2Score >= 25) {
    gameOver = true;
    alert(isPlayerOneTurn ? "Player 1 wins!" : "Player 2 wins!");
  } else {
    currentScore = 0;
    // Switch Player
    switchPlayer();
  }

  updateDisplay();
}

function switchPlayer() {
  isPlayerOneTurn = !isPlayerOneTurn; 
  const players = document.querySelectorAll(".player-card");
  players.forEach((player) => {
    if (player.classList.contains("active")) {
      player.classList.remove("active");
    } else {
      player.classList.add('active');
    }
  });
}

// Update Display
function updateDisplay() {
  if (isPlayerOneTurn) {
    player1Current.textContent = currentScore;
    player2Current.textContent = 0;
  } else {
    player1Current.textContent = 0;
    player2Current.textContent = currentScore;
  }

  total1.textContent = player1Score;
  total2.textContent = player2Score;
}

function startGame() {
  player1Score = 0;
  player2Score = 0;
  player1Total = 0;
  player2Total = 0;
  currentScore = 0;
  currentPlayer = 1;
}

rollBtn.addEventListener('click', () => rollDice());
holdBtn.addEventListener('click', () => hold());
resetBtn.addEventListener('click', () => startGame()); // start a new game
  //


// Switch Players
