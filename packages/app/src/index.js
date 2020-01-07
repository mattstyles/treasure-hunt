
import { resize } from 'raid-streams/screen'
import keys from 'raid-streams/keys'

import { resizeScreen, debug, render } from './core/effects'
import { appUpdates } from './core/updates'
import { signal } from './core/state'
import { renderTick, updateTick } from './core/streams'
import { resizeApp } from './core/app'

/**
 * Setup screen
 */
// const screen = createCanvas()
// const { app, resize: resizeApp } = createApplication({
//   canvas: screen,
//   appProps: {
//     backgroundColor: 0x333333
//   }
// })

/**
 * Mount global streams
 */
signal.mount(resize({
  debounce: 100,
  el: window
}))
signal.mount(keys())
signal.mount(renderTick())
signal.mount(updateTick({
  rate: 1000 / 8
}))

/**
 * Attach effect handlers
 */
if (process.env.DEBUG) {
  signal.register(debug())
}

signal.register(resizeScreen({
  onResize: resizeApp
}))

signal.register(render())

/**
 * Attach global updates
 */
signal.register(appUpdates)

// test tick update timing
signal.register((state, event) => {
  if (event.type === '@@tick/update') {
    // console.log('>>', state.count, event.payload.dt)
    return {
      ...state,
      count: state.count + 1 || 0
    }
  }
  return state
})

/**
 * Start app loop
 */
signal.observe(
  state => {
    window.state = state
  },
  err => {
    console.error(err)
  })
