const PRESSED = 1
const RELEASED = 0

export default class KeyboardState {
  constructor() {
    // holds current state of a given key
    this.keyStates = new Map()

    // holds handlers for a given key
    this.keyMap = new Map()
  }

  addMapping(code, handler) {
    this.keyMap.set(code, handler)
  }

  handleEvent(event) {
    const {code} = event

    if(!this.keyMap.has(code)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    if(this.keyStates.get(code) === keyState) {
      return
    }

    this.keyStates.set(code, keyState)

    this.keyMap.get(code)(keyState)
  }

  listenTo(global) {
    ['keydown', 'keyup'].forEach(eventName => {
      global.addEventListener(eventName, (event) => this.handleEvent(event))
    })
  }
}
