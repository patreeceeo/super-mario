import Level from './Level.js'
import {createBackgroundLayer, createSpriteLayer, createCollisionDebugLayer} from './layers.js'
import SpriteSheet from './SpriteSheet.js'

function loadJSON(url) {
  return fetch(url).then(r => r.json())
}

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
  function applyRange (background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen
    const yEnd = yStart + yLen
    for(let x = xStart; x < xEnd; ++x) {
      for(let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
        })
      }
    }
  }

  backgrounds.forEach(background => {
    background.ranges.forEach((range) => {
      if(range.length === 2) {
        applyRange(background, range[0], 1, range[1], 1)
      }

      if(range.length === 3) {
        applyRange(background, range[0], range[1], range[2], 1)
      }

      if(range.length === 4) {
        applyRange(background, range[0], range[1], range[2], range[3])
      }
    })
  })
}

function loadSpriteSheet(name) {
  return loadJSON(`/sprites/${name}.json`).then(spritesSpec => {
    return Promise.all([
      spritesSpec,
      loadImage(spritesSpec.imageURL)
    ])
  })
    .then(([spritesSpec, image]) => {
      const sprites = new SpriteSheet(image, spritesSpec.tileW, spritesSpec.tileH)
      spritesSpec.tiles.forEach(({name, index: [x, y]}) => {
        sprites.defineTile(name, x, y)
      })
      return sprites
    })
}

export function loadLevel (name) {
  return loadJSON(`/levels/${name}.json`)
    .then(levelSpec => {
      return Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet)
      ])
    })
    .then(([
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
