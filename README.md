# Raycasting Engine

A **simple raycasting engine**, inspired by classic 2.5D rendering techniques used in games like _Wolfenstein 3D_. This project was created to study and implement the fundamentals of raycasting in games and simulations, featuring texture support.

<img width="100%" src=".github/demo.gif"/>

## Features

- 🖼️ **2.5D Rendering** using efficient raycasting techniques.
- 🧱 **Textured Walls**.
- 🎮 **Smooth Player Movement**, with rotation and strafing support.
- 🚪 **Map Maker** for a custom exploration.
- 💡 **Basic Lighting Simulation**, with simple shading effects.

## Controls

- W/S: Move forward/backward;
- A/D: Rotate left/right;
- Arrow keys: Alternate movement controls.

You can try it [here](https://react-raycasting-engine.vercel.app/).

## How it works

#### Raycasting

The system uses the _raycasting_ technique, which projects rays in a 2D grid to determine visible objects and renders them with perspective. Each ray calculates wall intersections, creating the illusion of depth in a pseudo-3D view.

#### Maps

Maps are represented as 2D arrays, where each number corresponds to a block type or empty space. For example:

```JavaScript
const map = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 2, 0, 1],
  [1, 1, 1, 1, 1]
]
```

## Acknowledgments

- Inspired by: _Wolfenstein 3D_ and other classic raycasting games.
- Tools used: [p5.js](https://p5js.org) and a lot of patience.

\*_This implementation was madded following [this](https://lodev.org/cgtutor/raycasting.html) article_
