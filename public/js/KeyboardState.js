const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  constructor() {
    // holds current state of a given key
    this.keyStates = new Map()

    // holds handlers for a given key
    this.keyMap = new Map()
  }

  addMapping(keyCode, handler) {
    this.keyMap.set(keyCode, handler)
  }

  handleEvent(event) {
    const {keyCode} = event

    if(!this.keyMap.has(keyCode)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    if(this.keyStates.get(keyCode) === keyState) {
      return
    }

    this.keyStates.set(keyCode, keyState)

    this.keyMap.get(keyCode)(keyState)
  }

  listenTo(global) {
    ['keydown', 'keyup'].forEach(eventName => {
      global.addEventListener(eventName, (event) => this.handleEvent(event))
    })
  }
}
