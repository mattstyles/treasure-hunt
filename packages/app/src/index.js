
import { createApplication, createCanvas, stats } from './app'
import { resize } from 'raid-streams/screen'
import keys from 'raid-streams/keys'
import tick from 'raid-streams/tick'

import { resizeScreen, debug } from './core/effects'
import { signal } from './core/state'

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

/**
 * Attach effect handlers
 */
if (process.env.DEBUG) {
  signal.register(debug())
}

signal.register(resizeScreen({
  onResize: resizeApp
}))
