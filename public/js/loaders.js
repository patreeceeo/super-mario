import Level from './Level.js'
import {createBackgroundLayer, createSpriteLayer, createCollisionDebugLayer} from './layers.js'
import {loadBackgroundSprites} from './sprites.js'

export function loadImage (url) {
  return new Promise((resolve) => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

function createTiles(level, backgrounds) {
  backgrounds.forEach(background => {
    background.ranges.forEach(([xStart, xLen, yStart, yLen]) => {
      const xEnd = xStart + xLen
      const yEnd = yStart + yLen
      for(let x = xStart; x < xEnd; ++x) {
        for(let y = yStart; y < yEnd; ++y) {
          level.tiles.set(x, y, {
            name: background.tile
          })
        }
      }
    })
  })
}

export function loadLevel (name) {
  return Promise.all([
    fetch(`/levels/${name}.json`).then(r => r.json()),
    loadBackgroundSprites()
  ]).then(([
    levelSpec,
    backgroundSprites
  ]) => {
    const level = new Level()

    createTiles(level, levelSpec.backgrounds)

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites)
    const spriteLayer = createSpriteLayer(level.entities)
    const collisionDebugLayer = createCollisionDebugLayer(level)

    level.comp.layers.push(backgroundLayer)
    level.comp.layers.push(spriteLayer)
    level.comp.layers.push(collisionDebugLayer)

    return level
  })
}
