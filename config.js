export const CONFIG = {
  canvasWidth: 800,
  canvasHeight: 600,
  gravity: 1,
  pipeSpeed: 2,
  pipeGap: 220,
  minPipeGap: 120,
  pipeFrequency: 300,
  pipeWidth: 80,
  speedIncreaseRate: 0.02,
  gapDecreaseRate: 0.05,
};

export const CONFIG_MOBILE = {
  canvasWidth: window.innerWidth,
  canvasHeight: window.innerHeight,
  gravity: 0.6,
  pipeSpeed: 2,
  pipeGap: 200,          // Starting vertical gap between pipes
  minPipeGap: 100,       // Minimum vertical gap
  pipeFrequency: 250,    // Horizontal distance between pipes
  pipeWidth: 80,         // Width of each pipe
  speedIncreaseRate: 0.002,
  gapDecreaseRate: 0.05,
};