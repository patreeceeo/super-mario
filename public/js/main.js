import {loadLevel} from './loaders.js'
import {loadBackgroundSprites} from './sprites.js'
import Compositor from './Compositor.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([mario, sprites, level]) => {
  const comp = new Compositor()

  const gravity = 30
  mario.pos.set(32, 176)
  mario.vel.set(200, -600)

  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
  const spriteLayer = createSpriteLayer(mario)
  const timer = new Timer()

  comp.layers.push(backgroundLayer)
  comp.layers.push(spriteLayer)

  timer.update = (deltaTime) => {
    comp.draw(context)
    mario.update(deltaTime)
    mario.vel.y += gravity
  }

  timer.start()

})
