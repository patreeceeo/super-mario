import {Trait} from '../Entity.js'

export default class Jump extends Trait {
  constructor() {
    super('jump')
    this.velocity = 200
    this.duration = 0.3
    this.engageTime = 0
  }

  update(entity, deltaTime) {
    if(this.engageTime > 0) {
      entity.vel.y = -this.velocity
      this.engageTime -= deltaTime
    }
  }

  start() {
    this.engageTime = this.duration
  }

  cancel() {
    this.engageTime = 0
  }
}

