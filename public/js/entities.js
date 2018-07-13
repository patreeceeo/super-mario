import Entity from './Entity.js'
import {loadMarioSprite} from './sprites.js'
import Jump from './traits/Jump.js'
import Walk from './traits/Walk.js'


export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity()

    mario.size.set(14, 16)

    // Order matters
    mario.addTrait(new Walk())
    mario.addTrait(new Jump())

    mario.draw = function drawMario(context) {
      sprite.draw('idle', context, 0, 0)
    }

    return mario
  })
}
