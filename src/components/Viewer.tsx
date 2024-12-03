/* eslint-disable @typescript-eslint/no-explicit-any */
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { mapService } from '../utils/map';
import { Button } from './ui/button';

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

let map: number[][] = [];

const FOV = 66;

let textures: Record<number, { light?: any; dark?: any }> = {};

let renderBuffer: any;

const position = { x: 1.3, y: 2 };
const direction = { x: 1, y: 0 };
const camPlane = {
  x: Math.sin(toRadians(FOV / 2)),
  y: Math.cos(toRadians(FOV / 2)),
};

function castRays(p5: P5CanvasInstance) {
  const { width, height } = p5;

  renderBuffer.clear();

  for (let x = 0; x < width; x++) {
    const camX = (2 * x) / width - 1;

    const mapCoordinates = {
      x: Math.floor(position.x),
      y: Math.floor(position.y),
    };

    const rayDir = {
      x: direction.x + camPlane.x * camX,
      y: direction.y + camPlane.y * camX,
    };

    let sideDistX = -1;
    let sideDistY = -1;

    const deltaDistX = Math.abs(1 / rayDir.x);
    const deltaDistY = Math.abs(1 / rayDir.y);
    let perpWallDist = 0;

    let stepX = 0;
    let stepY = 0;

    let hit = 0;
    let side = 0;

    if (rayDir.x < 0) {
      stepX = -1;
      sideDistX = (position.x - mapCoordinates.x) * deltaDistX;
    } else {
      stepX = 1;
      sideDistX = (mapCoordinates.x + 1 - position.x) * deltaDistX;
    }

    if (rayDir.y < 0) {
      stepY = -1;
      sideDistY = (position.y - mapCoordinates.y) * deltaDistY;
    } else {
      stepY = 1;
      sideDistY = (mapCoordinates.y + 1 - position.y) * deltaDistY;
    }

    while (hit === 0) {
      if (sideDistX < sideDistY) {
        sideDistX += deltaDistX;
        mapCoordinates.x += stepX;
        side = 0;
      } else {
        sideDistY += deltaDistY;
        mapCoordinates.y += stepY;
        side = 1;
      }

      if (map[mapCoordinates.x][mapCoordinates.y] > 0) hit = 1;
    }

    const mapCell = map[mapCoordinates.x][mapCoordinates.y];

    perpWallDist =
      side === 0
        ? (mapCoordinates.x - position.x + (1 - stepX) / 2) / rayDir.x
        : (mapCoordinates.y - position.y + (1 - stepY) / 2) / rayDir.y;
    perpWallDist = Math.max(perpWallDist, 0.3);

    const lineHeight = height / perpWallDist;
    const drawStart = -lineHeight / 2 + height / 2;
    const drawEnd = lineHeight / 2 + height / 2;

    let wallX = 0;

    if (side === 0) {
      wallX = position.y + perpWallDist * rayDir.y;
    } else {
      wallX = position.x + perpWallDist * rayDir.x;
    }

    wallX -= Math.floor(wallX);

    if (wallX < 0) wallX = 0;
    else if (wallX > 1) wallX = 1;

    const texture =
      side === 0 ? textures[mapCell].dark : textures[mapCell].light;
    let textureX = wallX * texture.width;
    if (side === 0 && rayDir.x > 0) textureX = texture.width - textureX - 1;
    if (side === 0 && rayDir.y < 0) textureX = texture.width - textureX - 1;

    renderBuffer.image(
      texture,
      x,
      drawStart,
      1,
      drawEnd - drawStart,
      textureX,
      0,
      1,
      texture.height
    );
  }

  p5.image(renderBuffer, 0, 0, width, height);
}

function clampPlayerToWall() {
  const epsilon = 2;
  const tileX = Math.floor(position.x);
  const tileY = Math.floor(position.y);

  if (map[tileX][tileY] > 0) {
    position.x -= direction.x * epsilon;
    position.y -= direction.y * epsilon;
  }
}

function sketch(p5: P5CanvasInstance) {
  p5.preload = () => {
    textures = {
      1: { light: p5.loadImage('/assets/greystone.png') },
      2: { light: p5.loadImage('/assets/mossy.png') },
      3: { light: p5.loadImage('/assets/redbrick.png') },
      4: { light: p5.loadImage('/assets/wood.png') },
      5: { light: p5.loadImage('/assets/colorstone.png') },
    };

    let mapWithBorder = mapService.load();

    mapWithBorder = [
      Array(mapWithBorder[0].length + 1).fill(1),
      ...mapWithBorder,
      Array(mapWithBorder[0].length + 1).fill(1),
    ];

    map = mapWithBorder.map((row) => [1, ...row, 1]);

    const startX = map.findIndex((row) => row.includes(-1));
    const startY = map[startX].findIndex((col) => col === -1);

    position.x = startX + 0.5;
    position.y = startY + 0.5;
  };

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);

    textures = {
      1: {
        ...textures[1],
        dark: textures[1].light.get(),
      },
      2: {
        ...textures[2],
        dark: textures[2].light.get(),
      },
      3: {
        ...textures[3],
        dark: textures[3].light.get(),
      },
      4: {
        ...textures[4],
        dark: textures[4].light.get(),
      },
      5: {
        ...textures[5],
        dark: textures[5].light.get(),
      },
    };

    textures[1].dark.loadPixels();
    textures[2].dark.loadPixels();
    textures[3].dark.loadPixels();
    textures[4].dark.loadPixels();
    textures[5].dark.loadPixels();
    for (let i = 0; i < textures[1].dark.pixels.length; i += 4) {
      textures[1].dark.pixels[i] *= 0.35;
      textures[1].dark.pixels[i + 1] *= 0.35;
      textures[1].dark.pixels[i + 2] *= 0.35;

      textures[2].dark.pixels[i] *= 0.35;
      textures[2].dark.pixels[i + 1] *= 0.35;
      textures[2].dark.pixels[i + 2] *= 0.35;

      textures[3].dark.pixels[i] *= 0.35;
      textures[3].dark.pixels[i + 1] *= 0.35;
      textures[3].dark.pixels[i + 2] *= 0.35;

      textures[4].dark.pixels[i] *= 0.35;
      textures[4].dark.pixels[i + 1] *= 0.35;
      textures[4].dark.pixels[i + 2] *= 0.35;

      textures[5].dark.pixels[i] *= 0.35;
      textures[5].dark.pixels[i + 1] *= 0.35;
      textures[5].dark.pixels[i + 2] *= 0.35;
    }
    textures[1].dark.updatePixels();
    textures[2].dark.updatePixels();
    textures[3].dark.updatePixels();
    textures[4].dark.updatePixels();
    textures[5].dark.updatePixels();

    renderBuffer = p5.createGraphics(p5.width, p5.height);
    renderBuffer.noSmooth();
  };

  p5.windowResized = () => {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

    renderBuffer.resizeCanvas(p5.windowWidth, p5.windowHeight);
    renderBuffer.noSmooth();
  };

  p5.draw = () => {
    const moveSpeed = p5.deltaTime * 0.0035;
    const rotationSpeed = p5.deltaTime * 0.002;

    p5.background(12);

    if (p5.keyIsDown(p5.UP_ARROW)) {
      if (
        map[Math.floor(position.x + direction.x * moveSpeed)][
          Math.floor(position.y)
        ] <= 0
      ) {
        position.x += direction.x * moveSpeed;
      }

      if (
        map[Math.floor(position.x)][
          Math.floor(position.y + direction.y * moveSpeed)
        ] <= 0
      ) {
        position.y += direction.y * moveSpeed;
      }

      clampPlayerToWall();
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      if (
        map[Math.floor(position.x - direction.x * moveSpeed)][
          Math.floor(position.y)
        ] <= 0
      ) {
        position.x -= direction.x * moveSpeed;
      }

      if (
        map[Math.floor(position.x)][
          Math.floor(position.y - direction.y * moveSpeed)
        ] <= 0
      ) {
        position.y -= direction.y * moveSpeed;
      }

      clampPlayerToWall();
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
      let oldX = direction.x;

      direction.x =
        direction.x * Math.cos(-rotationSpeed) -
        direction.y * Math.sin(-rotationSpeed);

      direction.y =
        oldX * Math.sin(-rotationSpeed) +
        direction.y * Math.cos(-rotationSpeed);

      oldX = camPlane.x;

      camPlane.x =
        camPlane.x * Math.cos(-rotationSpeed) -
        camPlane.y * Math.sin(-rotationSpeed);

      camPlane.y =
        oldX * Math.sin(-rotationSpeed) + camPlane.y * Math.cos(-rotationSpeed);
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
      let oldX = direction.x;

      direction.x =
        direction.x * Math.cos(rotationSpeed) -
        direction.y * Math.sin(rotationSpeed);

      direction.y =
        oldX * Math.sin(rotationSpeed) + direction.y * Math.cos(rotationSpeed);

      oldX = camPlane.x;

      camPlane.x =
        camPlane.x * Math.cos(rotationSpeed) -
        camPlane.y * Math.sin(rotationSpeed);

      camPlane.y =
        oldX * Math.sin(rotationSpeed) + camPlane.y * Math.cos(rotationSpeed);
    }

    p5.fill(25);
    p5.rect(0, 0, p5.width, p5.height / 2);

    p5.fill(35);
    p5.rect(0, p5.height / 2, p5.width, p5.height / 2);

    castRays(p5);
  };
}

interface ViewerProps {
  onEditMap: () => void;
}

export const Viewer: React.FC<ViewerProps> = ({ onEditMap }) => {
  return (
    <>
      <div className="absolute right-0 p-6 opacity-15 hover:opacity-100 transition-opacity">
        <Button onClick={onEditMap} size="sm">
          Editar Mapa
        </Button>
      </div>

      <ReactP5Wrapper sketch={sketch} />
    </>
  );
};
