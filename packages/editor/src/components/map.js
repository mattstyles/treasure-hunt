
import React, { useRef, useEffect, useState } from 'react'
import { Application, Sprite } from 'pixi.js'
import { Point } from 'mathutil'

import { createApplication, createCamera } from 'core/map/utils'
import { frames } from 'core/map/textures'

const useApp = (canvasRef, {
  viewport,
  scale,
  cellSize
}) => {
  const [app, setApp] = useState(null)
  const [camera, setCamera] = useState(null)
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const {
      appInstance,
      container: cameraContainer
    } = createApplication(canvas, {
      viewport,
      scale,
      cellSize
    })
    const cameraInstance = createCamera(cameraContainer, {
      viewport,
      cellSize
    })

    setApp(appInstance)
    setCamera(cameraInstance)
    setContainer(cameraContainer)

    /**
     * Add sprite as a test of rendering
     */
    const dude = new Sprite(frames[2])
    const dudePosition = Point.of(10, 10)
    dude.tint = 0xFAF089
    cameraContainer.addChild(dude)

    cameraInstance.translateSprite(dude, ...dudePosition.pos)

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
    container,
    camera
  }
}

export const Map = ({
  viewport,
  scale,
  cellSize
}) => {
  const canvasRef = useRef(null)
  useApp(canvasRef, {
    viewport,
    scale,
    cellSize
  })

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={480}
      style={{ display: 'block' }}
    />
  )
}
