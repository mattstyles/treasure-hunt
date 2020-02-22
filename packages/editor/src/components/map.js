
import React, { useRef, useEffect, useState } from 'react'
import { Application, Sprite } from 'pixi.js'
import { Point } from 'mathutil'
import { Button } from 'react-basic-kit'
import { random } from 'lodash'

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
     * @TODO how to expose this for manipulation somehow
     */
    const dude = new Sprite(frames[2])
    const dudePosition = Point.of(31, 24)
    dude.tint = 0xFAF089
    cameraContainer.addChild(dude)

    window.dude = dude
    window.dudePosition = dudePosition

    appInstance.ticker.add(() => {
      cameraInstance.translateSprite(dude, ...dudePosition.pos)
    })

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

// const useRenderTick = (app, callback) => {
//   useEffect(() => {
//     if (!app || !callback || !(app instanceof Application)) {
//       return
//     }
//
//     app.ticker.add(callback)
//
//     return () => {
//       app.ticker.remove(callback)
//     }
//   })
// }

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
    <>
      <canvas
        ref={canvasRef}
        style={{ display: 'block' }}
      />
      <Button
        colour='blue'
        sx={{ mt: 4 }}
        onClick={() => {
          // @TODO no good globalising on the window
          if (window.dudePosition) {
            window.dudePosition.translate(random(-5, 5), random(-5, 5))
          }
        }}
      >
        This is a test, click me
      </Button>
    </>
  )
}
