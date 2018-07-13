import {loadLevel} from './loaders.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import {setupKeyboard} from './input.js'
import Camera from './Camera.js'
import {setupMouseControl} from './debug.js'

const canvas = document.getElementById('screen')
const context = canvas.getContext('2d')


Promise.all([
  createMario(),
  loadLevel('1-1')
]).then(([mario, level]) => {
  mario.pos.set(32, 176)

  level.entities.add(mario)

  const camera = new Camera()
  const timer = new Timer()

  const keyboard = setupKeyboard(mario)
  keyboard.listenTo(window)

  timer.update = (deltaTime) => {
    level.update(deltaTime)
    level.comp.draw(context, camera)
  }

  setupMouseControl(canvas, mario, camera)

  timer.start()
})
