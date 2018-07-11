

export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas')
  buffer.height = 256
  buffer.width = 240

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, buffer.getContext('2d'), x, y)
  })

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0)
  }
}

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach((entity) => {
      entity.draw(context)
    })
  }
}

// for debugging
export function createCollisionDebugLayer(level) {
  const resolvedTiles = []

  const tileResolver = level.tileCollider.tiles
  const tileSize = tileResolver.tileSize

  const getByIndexOriginal = tileResolver.getByIndex
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x, y})
    return getByIndexOriginal.call(tileResolver, x, y)
  }

  return function drawCollision(context) {
    context.strokeStyle = 'blue'
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath()
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
      context.stroke()
    })

    resolvedTiles.length = 0
  }
}
