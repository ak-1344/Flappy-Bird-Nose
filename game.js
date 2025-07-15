import { CONFIG } from './config.js';

let pipes = [];
let birdY = CONFIG.canvasHeight / 2;
let velocity = 0;
let score = 0;
let highScore = 0;
let gameOver = false;
let paused = false;
let gameStarted = false;

const birdImg = new Image();
birdImg.src = './assets/bird.png';

const pipeImg = new Image();
pipeImg.src = './assets/pipe-top.png';

const pointSound = new Audio('./assets/point.mp3');
const hitSound = new Audio('./assets/hit.mp3');

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function createPipe() {
  const gapY = Math.random() * (CONFIG.canvasHeight - CONFIG.pipeGap - 100) + 50;
  pipes.push({
    x: CONFIG.canvasWidth,
    gapY,
    passed: false,
  });
}

function checkCollision() {
  for (let pipe of pipes) {
    const inX = 100 + 20 > pipe.x && 100 - 20 < pipe.x + CONFIG.pipeWidth;
    const inTop = birdY - 20 < pipe.gapY;
    const inBottom = birdY + 20 > pipe.gapY + CONFIG.pipeGap;

    if (inX && (inTop || inBottom)) return true;
  }

  return birdY < 0 || birdY > CONFIG.canvasHeight;
}

function updateGame(noseY, ctx) {
  if (!gameStarted || paused || gameOver) return;

  velocity += CONFIG.gravity;
  birdY = lerp(birdY, noseY, 0.2);

  for (let pipe of pipes) {
    pipe.x -= CONFIG.pipeSpeed;
  }

  pipes = pipes.filter(pipe => pipe.x + CONFIG.pipeWidth > 0);

  if (pipes.length === 0 || pipes[pipes.length - 1].x < CONFIG.canvasWidth - CONFIG.pipeFrequency) {
    createPipe();
  }

  CONFIG.pipeSpeed += CONFIG.speedIncreaseRate;
  CONFIG.pipeGap = Math.max(CONFIG.minPipeGap, CONFIG.pipeGap - CONFIG.gapDecreaseRate);

  ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);

  for (let pipe of pipes) {
    // Top pipe (normal)
    ctx.drawImage(
      pipeImg,
      pipe.x,
      pipe.gapY - pipeImg.height,
      CONFIG.pipeWidth,
      pipeImg.height
    );

    // Bottom pipe (flipped vertically)
    ctx.save();
    ctx.translate(pipe.x, pipe.gapY + CONFIG.pipeGap + pipeImg.height);
    ctx.scale(1, -1);
    ctx.drawImage(
      pipeImg,
      0,
      0,
      CONFIG.pipeWidth,
      pipeImg.height
    );
    ctx.restore();

    // ✅ Score logic (only once per pipe)
    if (!pipe.passed && pipe.x + CONFIG.pipeWidth < 100) {
      pipe.passed = true;
      score += 1;
      pointSound.play();
    }
  }

  // Draw the bird
  ctx.drawImage(birdImg, 80, birdY - 20, 40, 40);

  // Score display
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
  ctx.fillText("High Score: " + highScore, 10, 60);

  // Collision check
  if (checkCollision()) {
    gameOver = true;
    hitSound.play();

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("flappyHigh", highScore);
    }

    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOverOverlay").style.display = "block";
  }
}

function resetGame() {
  pipes = [];
  birdY = CONFIG.canvasHeight / 2;
  velocity = 0;
  score = 0;
  gameOver = false;
  paused = false;
  CONFIG.pipeSpeed = 2;
  CONFIG.pipeGap = 220;
  document.getElementById("gameOverOverlay").style.display = "none";
}

function startGame() {
  gameStarted = true;
  resetGame();
}

function pauseGame() {
  paused = !paused;
}

function loadHighScore() {
  highScore = parseInt(localStorage.getItem("flappyHigh")) || 0;
}

export { updateGame, resetGame, pauseGame, startGame, loadHighScore };
