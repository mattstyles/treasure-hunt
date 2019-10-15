
import { fromEvent } from 'most'
import raf from 'raf-stream'

const renderRaf = raf(window)
const updateRaf = raf(window)

const tickActions = {
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

const tickMapper = type => event => ({
  type: type,
  payload: {
    dt: event
  }
})

export const renderTick = () => fromEvent('data', renderRaf)
  .map(tickMapper(tickActions.tick))

export const updateTick = ({
  rate = 0
} = {}) => fromEvent('data', renderRaf)
  .map(tickMapper(tickActions.update))
  .debounce(rate)
