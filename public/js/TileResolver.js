export default class TileResolver {
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix
    this.tileSize = tileSize
  }

  toIndex(pos) {
    return Math.floor(pos / this.tileSize)
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize

    const range = []
    let pos = pos1
    do {
      range.push(this.toIndex(pos))
      pos += this.tileSize
    } while(pos < pMax)

    return range
  }

  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY)

    if(tile) {
      return {
        tile,
        x1: indexX * this.tileSize,
        x2: (indexX + 1) * this.tileSize,
        y1: indexY * this.tileSize,
        y2: (indexY + 1) * this.tileSize
      }
    }
  }

  // TODO: should this be refactored to accept a Vec2 instead?
  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY))
  }

  searchByRange(x1, x2, y1, y2) {
    const matches = []

    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY)
        if(match) {
          matches.push(match)
        }
      })
    })

    return matches
  }
}

