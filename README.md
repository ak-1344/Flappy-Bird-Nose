# 🐤 Flappy Nose Game – Nose-Controlled Flappy Bird Clone

A browser-based **Flappy Bird clone** where the bird is controlled in real-time using your **nose tracked via webcam** using **TensorFlow\.js FaceMesh**. Built with **HTML5 Canvas**, this game is styled with a modern UI, features start/pause/restart controls, collision detection, sound effects, and a real-time score and high score tracker.

---

## 🎮 Gameplay Features

| Feature               | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| Nose Control          | Bird moves up/down by tracking your **nose position** from webcam.     |
| Realistic Bird Motion | Uses smooth interpolation (`lerp`) to match your movement naturally.   |
| Pipe Generation       | Randomly generated pipes with increasing speed and decreasing gap.     |
| Collision Detection   | Ends game on pipe hit or out-of-bounds.                                |
| Sound Effects         | Feedback sounds for pipe pass (`point.mp3`) and collision (`hit.mp3`). |
| Score System          | Score increases **only when a pipe is passed**.                        |
| High Score Tracker    | Stores high score in browser via `localStorage`.                       |
| UI Controls           | **Start, Pause, Restart** buttons.                                     |
| Visual Polish         | Bird sprite, background image, translucent webcam feed over canvas.    |

---

## 🧱 Tech Stack

* HTML5 + CSS3
* JavaScript (ES6 Modules)
* HTML5 Canvas API
* TensorFlow\.js FaceMesh Model
* Audio API

---

## 🗂️ Project Structure

```
flappy-nose-game/
├── public/
│   ├── index.html          # Main HTML page
│   ├── style.css           # CSS styles
│   ├── script.js           # Webcam, face detection, game loop
│   ├── game.js             # Game logic (pipes, scoring, collision)
│   ├── config.js           # Central configuration for game settings
│   └── assets/
│       ├── bird.png        # Bird image
│       ├── background.jpg  # Background image
│       ├── point.mp3       # Sound on pipe pass
│       └── hit.mp3         # Sound on game over
└── README.md               # You're here!
```

---

## 📄 File Descriptions

### `index.html`

* Loads the canvas, webcam feed, and overlays
* Has buttons for **Start**, **Pause**, and **Restart**
* Displays score and high score

### `style.css`

* Styles the game box, overlay, background, buttons, and canvas
* Video feed is **translucent** (`opacity: 0.35`)
* Pipes and canvas are styled to appear polished

### `script.js`

* Loads the FaceMesh model
* Sets up the webcam feed
* Starts the game loop only **after pressing Start**
* Continuously gets the nose tip Y-coordinate and feeds it into the game loop

### `game.js`

* Manages all the game logic:

  * Bird physics (gravity, velocity)
  * Pipe spawning and movement
  * Collision detection
  * Score tracking
  * Audio triggers
  * Game state (started, paused, over)

### `config.js`

* Central configuration file
* You can tweak:

  * Canvas size
  * Gravity
  * Pipe speed and frequency
  * Pipe gap size and difficulty increase rate

---

## 🚀 How to Run

1. Clone/download the repo
2. Serve `public/` folder using a live server (VSCode Live Server or Python's `http.server`)
3. Open in Chrome or Edge
4. Grant webcam permission
5. Press **Start** and control the bird with your **nose** 😄

---

## 📦 Dependencies (CDN)

No installation required. External libraries are loaded via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.20.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/facemesh@0.0.4"></script>
```

---

## 🎨 Credits & Notes

* Background: royalty-free image
* Bird: `bird.png` from public sprite packs
* Sounds: sourced from [freesound.org](https://freesound.org/) or [Kenney.nl](https://kenney.nl/)
* FaceMesh: by TensorFlow\.js

---

## 📌 Future Ideas

* Add **hand-control toggle**
* Add **background music** or mute button
* Export to **Electron** or host on **Vercel/Netlify**
* Add leaderboard with **Node.js backend**

---

Happy flying! 🚀🐤
