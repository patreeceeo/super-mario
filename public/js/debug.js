
export function setupMouseControl(canvas, entity, camera) {
  ['mousedown', 'mousemove'].forEach(eventName => {
    let lastEvent
    canvas.addEventListener(eventName, event => {
      if(event.buttons === 1) {
        if(event.shiftKey) {
          if(lastEvent && lastEvent.shiftKey && lastEvent.type === 'mousemove') {
            camera.pos.x -= event.offsetX - lastEvent.offsetX
          }
        } else {
          entity.vel.set(0, 0)
          entity.pos.set(
            event.offsetX + camera.pos.x,
            event.offsetY + camera.pos.y
          )
        }
      }

      lastEvent = event
    })
  })
}
