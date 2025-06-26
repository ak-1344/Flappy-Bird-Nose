import { updateGame, resetGame, pauseGame, startGame, loadHighScore } from "./game.js";

const video = document.getElementById("webcam");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let currentNoseY = canvas.height / 2;
let model;

function renderLoop() {
  async function render() {
    if (model) {
      const predictions = await model.estimateFaces(video);

      if (predictions.length > 0) {
        const keypoints = predictions[0].scaledMesh;
        const [x, y] = keypoints[1];
        currentNoseY = y * (canvas.height / video.videoHeight);
      }
    }

    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    updateGame(currentNoseY, ctx);
    ctx.restore();

    requestAnimationFrame(render);
  }

  render();
}

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false,
  });
  video.srcObject = stream;
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      video.play();
      resolve();
    };
  });
}

// Bind buttons globally
window.startGame = () => startGame();
window.restartGame = () => {
  resetGame();
  startGame(); // restart from 0
};
window.pauseGame = () => pauseGame();

async function main() {
  await tf.setBackend("webgl");
  await setupCamera();
  model = await facemesh.load();
  loadHighScore();
  renderLoop();
}

main();
