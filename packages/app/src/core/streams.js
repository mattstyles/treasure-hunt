
import { fromEvent } from 'most'
import raf from 'raf-stream'
import EE from 'eventemitter3'

/**
 * Animation frames are kept separate here.
 * For now the pause and resume are tied, but, there may be a case where
 * updates are paused (which effectively pauses the simulation) but the render
 * continues to tick (i.e. entity animations continue to play).
 * So they are kept separate for now.
 */
const renderRaf = raf(window)
const updateRaf = raf(window)

export const tickActions = {
  tick: '@@tick/tick',
  update: '@@tick/update'
}

export const pause = () => {
  renderRaf.pause()
  updateRaf.pause()
}

export const resume = () => {
  renderRaf.resume()
  updateRaf.resume()
}

/**
 * Maps the delta between frames (event) to the passed in type of emit event.
 */
const tickMapper = type => event => ({
  type: type,
  payload: {
    dt: event
  }
})

/**
 * Fires for each animation frame and emits the delta between frames
 */
export const renderTick = () => fromEvent('data', renderRaf)
  .map(tickMapper(tickActions.tick))

/**
 * Attempting to listen directly to raf and then use scan and throttle to count
 * up and to throttle stream emission doesn't really work as keeping scan and
 * throttle in-sync does not happen. Easier to throttle the source, which can
 * also count easy enough.
 */
/**
 * Emits the mapped update tick but is really an example of a clamped animation
 * frame listener, i.e. it's on a period but connected to the aniamtion frame.
 * This also has the advantage of exposing the underlying stream to pause and
 * resume actions.
 */
export const updateTick = ({
  rate = 0
} = {}) => {
  const ee = new EE()
  let prev = 0
  updateRaf.on('data', dt => {
    prev = prev + dt
    if (prev > rate) {
      ee.emit('data', prev)
      prev = 0
    }
  })

  return fromEvent('data', ee)
    .map(tickMapper(tickActions.update))
}

// export const updateTick = ({
//   rate = 0
// } = {}) => fromEvent('data', renderRaf)
//   // .map(event => {
//   //   console.log(event)
//   //   return event
//   // })
//   .scan((prev, dt) => {
//     // console.log(prev)
//     if (prev > rate) {
//       prev = 0
//     }
//
//     return prev + dt
//   }, 0)
//   .map(tickMapper(tickActions.update))
//   .throttle(rate)
