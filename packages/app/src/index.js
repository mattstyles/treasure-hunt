
import { createApplication, createCanvas, stats } from './app'
import { resize } from 'raid-streams/screen'
import keys from 'raid-streams/keys'
// import tick from 'raid-streams/tick'

import { resizeScreen, debug } from './core/effects'
import { appUpdates } from './core/updates'
import { signal } from './core/state'
import { renderTick, updateTick } from './core/streams'

/**
 * Setup screen
 */
const screen = createCanvas()
const { app, resize: resizeApp } = createApplication({
  canvas: screen,
  appProps: {
    backgroundColor: 0x333333
  }
})

/**
 * Attach window resize handler
 */
signal.mount(resize({
  debounce: 100,
  el: window
}))
signal.mount(keys())
// signal.mount(tick())
signal.mount(renderTick())
signal.mount(updateTick(1000 / 20))

/**
 * Attach effect handlers
 */
if (process.env.DEBUG) {
  signal.register(debug())
}

signal.register(resizeScreen({
  onResize: resizeApp
}))

signal.register(appUpdates)

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
