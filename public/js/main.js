import {loadLevel} from './loaders.js'
import {createMario} from './entities.js'
import Timer from './Timer.js'
import {setupKeyboard} from './input.js'
import Camera from './Camera.js'
import {setupMouseControl} from './debug.js'
import {createCameraLayer} from './layers.js'

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

  window.camera = camera

  level.comp.layers.push(createCameraLayer(camera))

  const keyboard = setupKeyboard(mario)
  keyboard.listenTo(window)

  timer.update = (deltaTime) => {
    level.update(deltaTime)
    level.comp.draw(context, camera)
  }

  setupMouseControl(canvas, mario, camera)

  timer.start()
})
