
export class Vec2 {
  constructor(x, y) {
    this.set(x, y)
  }

  set(x, y) {
    this.x = x
    this.y = y
  }
}

export class Matrix {
  constructor() {
    this.grid = []
  }

  forEach(iterator) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        iterator(value, x, y)
      })
    })
  }

  get(x, y) {
    if(this.grid[x]) {
      return this.grid[x][y]
    }

    return undefined
  }

  set(x, y, value) {
    if(!this.grid[x]) {
      this.grid[x] = []
    }

    this.grid[x][y] = value
  }
}
