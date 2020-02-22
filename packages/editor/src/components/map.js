
import React, { useRef, useEffect, useState } from 'react'
import { Application, Container } from 'pixi.js'
import { Camera } from 'pixi-holga'
import { Rect, Point } from 'mathutil'

const createApplication = (canvas, {
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

const createCamera = (container, {
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

const useApp = (canvasRef, {
  viewport,
  scale,
  cellSize
}) => {
  const [app, setApp] = useState(null)
  const [camera, setCamera] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const {
      appInstance,
      container
    } = createApplication(canvas, {
      viewport,
      scale,
      cellSize
    })
    const cameraInstance = createCamera(container, {
      viewport,
      cellSize
    })

    setApp(appInstance)
    setCamera(cameraInstance)

    return () => {
      console.log('Running Map::useApp::useEffect return')
      if (app instanceof Application) {
        console.warn('Destroying PIXI application')
        app.destroy()
      }
    }
  }, [])

  return {
    app,
    camera
  }
}

export const Map = ({
  viewport,
  scale
}) => {
  const canvasRef = useRef(null)
  const {
    app,
    camera
  } = useApp(canvasRef, {
    viewport,
    scale,
    cellSize: [10, 10]
  })

  console.log('app:', app)
  console.log('camera:', camera)

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      style={{ display: 'block' }}
    />
  )
}
