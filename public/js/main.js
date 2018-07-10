import {loadLevel} from './loaders.js'
import {loadBackgroundSprites} from './sprites.js'
import Compositor from './Compositor.js'
import {createBackgroundLayer, createSpriteLayer} from './layers.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import Keyboard from './KeyboardState.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1')
]).then(([mario, sprites, level]) => {
  const comp = new Compositor()

  const gravity = 2000
  mario.pos.set(32, 176)

  const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites)
  const spriteLayer = createSpriteLayer(mario)
  const timer = new Timer()

  comp.layers.push(backgroundLayer)
  comp.layers.push(spriteLayer)

  const SPACE = 32
  const input = new Keyboard()
  input.addMapping(SPACE, keyState => {
    if(keyState) {
      mario.jump.start()
    } else {
      mario.jump.cancel()
    }
  })
  input.listenTo(window)

  timer.update = (deltaTime) => {
    mario.update(deltaTime)
    comp.draw(context)
    mario.vel.y += gravity * deltaTime
  }

  timer.start()

})
