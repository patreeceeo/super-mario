

export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas')
  const tiles = level.tiles
  const tileResolver = level.tileCollider.tiles
  const context = buffer.getContext('2d')

  buffer.width = 256 + 16
  buffer.height = 256

  let startIndex, endIndex
  function redraw(drawFrom, drawTo)  {
    if (drawFrom === startIndex && drawTo === endIndex) {
      return
    }

    startIndex = drawFrom
    endIndex = drawTo

    for (let x = startIndex; x <= endIndex; ++x) {
      const col = tiles.grid[x]
      if (col) {
        col.forEach((tile, y) => {
          sprites.drawTile(tile.name, context, x - startIndex, y)
        })
      }
    }
  }

  return function drawBackgroundLayer(context, camera) {
    const drawWidth = tileResolver.toIndex(camera.size.x)
    const drawFrom = tileResolver.toIndex(camera.pos.x)
    const drawTo = drawFrom + drawWidth
    redraw(drawFrom, drawTo)

    context.drawImage(buffer,
      -Math.floor(camera.pos.x) % tileResolver.tileSize,
      -Math.floor(camera.pos.y)
    )
  }
}

export function createSpriteLayer(entities, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas')
  spriteBuffer.width = width
  spriteBuffer.height = height
  const spriteBufferContext = spriteBuffer.getContext('2d')

  return function drawSpriteLayer(context, camera) {
    entities.forEach((entity) => {
      spriteBufferContext.clearRect(0, 0, width, height)
      entity.draw(spriteBufferContext)

      context.drawImage(
        spriteBuffer,
        Math.floor(entity.pos.x - camera.pos.x),
        Math.floor(entity.pos.y - camera.pos.y)
      )
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

  return function drawCollision(context, camera) {
    context.strokeStyle = 'blue'
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath()
      context.rect(
        x * tileSize - camera.pos.x,
        y * tileSize - camera.pos.y,
        tileSize,
        tileSize
      )
      context.stroke()
    })

    resolvedTiles.length = 0
  }
}

export function createCameraLayer(cameraToDraw) {
  return function drawCamera(context, fromCamera) {
    context.strokeStyle = 'purple'
    context.beginPath()
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    )
    context.stroke()
  }
}
