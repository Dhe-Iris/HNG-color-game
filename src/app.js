let colorButtons = document.querySelectorAll(".color-btn");
let colorBox = document.querySelector(".guess-box");
let scoreDisplay = document.getElementById("scoreValue");
let gameStatus = document.querySelector(".game-status");
let newGameBtn = document.getElementById("new-game-btn");

let score = 0;
let targetColor = "";
const colorOptions = ["red", "pink", "purple", "green", "orange", "blue"];

// Generate a Random Color from the Options
function generateRandomColor() {
  const randomColor =
    colorOptions[Math.floor(Math.random() * colorOptions.length)];
  targetColor = randomColor;
  colorBox.style.backgroundColor = randomColor;
}

// Generate Random Color Shades for the Options
function generateColorOptions() {
  let correctColor = targetColor;
  let wrongColors = colorOptions.filter((color) => color !== correctColor);
  let randomWrongColors = [];

  for (let i = 0; i < 3; i++) {
    randomWrongColors.push(
      wrongColors[Math.floor(Math.random() * wrongColors.length)]
    );
  }

  let allColors = [correctColor, ...randomWrongColors];
  shuffleArray(allColors);

  // Assign colors to buttons
  colorButtons.forEach((button, index) => {
    button.style.backgroundColor = allColors[index];
    button.dataset.color = allColors[index];
  });
}

// Shuffle Array Helper Function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Handle Button Clicks
colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedColor = this.dataset.color;
    const emoji = selectedColor === targetColor ? "✅" : "❌";

    if (selectedColor === targetColor) {
      score++;
      gameStatus.textContent = `Correct! ${emoji}`;
      gameStatus.classList.remove("wrong");
      gameStatus.classList.add("correct");
      scoreDisplay.textContent = score;
    } else {
      gameStatus.textContent = `Wrong! ${emoji}`;
      gameStatus.classList.remove("correct");
      gameStatus.classList.add("wrong");
    }

    setTimeout(resetGame, 1000);
  });
});

// Reset the Game
function resetGame() {
  generateRandomColor();
  generateColorOptions();
  gameStatus.textContent = "";
  gameStatus.classList.remove("correct", "wrong");
}

newGameBtn.addEventListener("click", () => {
  score = 0;
  scoreDisplay.textContent = score;
  resetGame();
});

resetGame();
