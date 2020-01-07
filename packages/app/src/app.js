
import Stats from 'stats.js'
import { Application } from 'pixi.js'
import fit from 'canvas-fit'

/**
 * Main Canvas
 */
export const createCanvas = ({
  id = 'js-canvas'
} = {}) => {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('id', id)
  document.body.appendChild(canvas)
  return canvas
}

/**
 * PIXI Application
 */
export const createApplication = ({
  canvas,
  appProps = {}
} = {}) => {
  const resolution = window.devicePixelRatio || 1
  const resize = fit(canvas)

  const app = new Application({
    width: canvas.width,
    height: canvas.height,
    resolution: resolution,
    view: canvas,
    ...appProps
  })

  return {
    app,
    resize: () => {
      resize()
      app.renderer.resize(canvas.width, canvas.height)
    }
  }
}

/**
 * FPS and Memory Counter
 */
const st = new Stats()
st.showPanel(0)
st.dom.style.right = '0px'
st.dom.style.left = 'auto'

if (process.env.DEBUG) {
  document.body.appendChild(st.dom)
}

const mock = {
  begin: () => {},
  end: () => {}
}

export const stats = process.env.DEBUG ? st : mock

/**
 * Create screen and app objects here
 */
export const screen = createCanvas()
export const { app, resize: resizeApp } = createApplication({
  canvas: screen,
  appProps: {
    backgroundColor: 0x333333
  }
})
