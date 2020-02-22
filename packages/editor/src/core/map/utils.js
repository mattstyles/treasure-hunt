
import { Application, Container } from 'pixi.js'
import { Camera } from 'pixi-holga'
import { Rect, Point } from 'mathutil'

export const createApplication = (canvas, {
  viewport,
  scale,
  cellSize
}) => {
  console.log('Creating PIXI application')

  const width = (viewport[0] * cellSize[0]) / scale
  const height = (viewport[1] * cellSize[1]) / scale

  const appInstance = new Application({
    width: width,
    height: height,
    backgroundColor: 0x303334,
    resolution: scale,
    view: canvas
  })

  const container = new Container()
  appInstance.stage.addChild(container)

  return {
    appInstance,
    container
  }
}

export const createCamera = (container, {
  viewport,
  cellSize
}) => {
  const camera = Camera.of({
    viewport: Rect.of(0, 0, viewport[0], viewport[1]),
    bounds: Rect.of(0, 0, viewport[0], viewport[1]),
    settings: {
      cellSize: Point.of(cellSize[0], cellSize[1])
    },
    container: container
  })

  return camera
}
