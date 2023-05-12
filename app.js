//User car movement 
let character = document.getElementById("character");
let isPaused = false;

function moveLeft() {
  if (!isPaused && gameOverOverlay.style.display !== "block") {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    left -= 100;
    if (left >= 0) {
      character.style.left = left + 'px';
    }
  }
}

function moveRight() {
  if (!isPaused && gameOverOverlay.style.display !== "block") {
    let left = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
    left += 100;
    if (left < 300) {
      character.style.left = left + 'px';
    }
  }
}

//Car sound


// User input event
document.addEventListener('keydown', event => {
  event.preventDefault();  
  if(event.key === 'ArrowLeft'){moveLeft();}
    if(event.key === 'ArrowRight'){moveRight();}
});

//Pause Game
const animations = document.querySelectorAll('.rain, #block, #road, #character');
const pauseOverlay = document.getElementById('pause-overlay');

function pauseAnimations() {
  animations.forEach(animation => {
    animation.style.setProperty('--animation-play-state', 'paused');
  });
  isPaused = true;
  pauseOverlay.style.display = 'block';
}

function resumeAnimations() {
  animations.forEach(animation => {
    animation.style.setProperty('--animation-play-state', 'running');
  });
  isPaused = false;
  pauseOverlay.style.display = 'none';
}

document.addEventListener('keydown', event => {
  if (startGameOverlay.style.display !== "none") {
    // Ignore arrow key events when start screen overlay is displayed
    event.preventDefault();
    return;
  }
  if (event.key === 'ArrowUp') {
    pauseAnimations();
    event.preventDefault();
  } else if (event.key === 'ArrowDown') {
    resumeAnimations();
  }
});
  

//Movement of puddle 
let block = document.getElementById('block');
let counter = 0;

block.addEventListener('animationiteration', () => {
    let random = Math.floor(Math.random() * 3);
    left = random * 100;
    block.style.left = left + 'px';
    counter++;
});
function resetCounter() {
    counter = 0;
}

const gameContainer = document.getElementById("game-container");
const gameOverOverlay = document.getElementById("game-over-overlay");
const scoreEl = document.getElementById("score");
const playAgainBtn = document.getElementById("play-again-btn");
let intervalId;
let isRunning = true;

 // show the game over screen
function showGameOverScreen() {
  // update the score displayed on the overlay
  scoreEl.innerText = counter;
  // show the game over overlay
  gameOverOverlay.style.display = "block";
  // pause the game (stop the interval)
  clearInterval(intervalId);
  // stop the sound
  
}

// restart the game on click
function restartGame() {
  isRunning = true;
  gameOverOverlay.style.display = "none";
  resetCounter();
  startGame();
}
// restart the game on spacebar
document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    restartGame();
  }
});
// add event listener for the play again button
playAgainBtn.addEventListener("click", function() {
  // hide the game over overlay
  gameOverOverlay.style.display = "none";
  // reset the game (e.g. reset character position, block position, score counter, etc.)
  resetCounter();
  startGame();
});
//Collision event to end game 
function checkCollision() {
  let characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue("top"));
  
  if (characterLeft == blockLeft && blockTop < 500 && blockTop > 300) {
    // show the game over screen
    showGameOverScreen();
  }
}

// Start game overlay
const startGameOverlay = document.getElementById("start-game-overlay");
startGameOverlay.style.display = "none";

// Show the start game overlay when the page has loaded
window.addEventListener("load", function() {
  showStartGameScreen();
});

function showStartGameScreen() {
  startGameOverlay.style.display = "flex";
  pauseAnimations();
  pauseOverlay.style.display = 'none';
  isPaused = true;
}

startGameOverlay.addEventListener("click", function() {
  startGameOverlay.style.display = "none";
  pauseOverlay.style.display = 'none';
  resumeAnimations();
  isPaused = false;
  startGame();
});

//Start game
function startGame() {
  intervalId = setInterval(function() {
    if (gameOverOverlay.style.display !== "block") {
      checkCollision();
      
    }
  }, 1);
}

startGame();



//Touchscreen input controls 
document.getElementById("right").addEventListener("touchstart", moveRight);
document.getElementById("left").addEventListener("touchstart", moveLeft);
//Touchscreen pause/play controls 
const titleElement = document.querySelector(".title")

titleElement.addEventListener("touchstart", function(){
  if (isPaused) {
    resumeAnimations();
    isPaused = false;
  } else {
    pauseAnimations();
    isPaused = true;
  }
});




