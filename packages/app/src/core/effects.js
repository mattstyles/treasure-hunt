
import safe from 'raid-addons/lib/safe'
import compress from 'raid-addons/lib/compress'
import rawDebug from 'raid-addons/lib/debug'
import scope from 'raid-addons/lib/scope'
import { actions } from 'raid-streams/screen'

import { tickActions } from './streams'
import { noop } from './utils'
import { getState } from '../states/index'
import { stats } from './app'

/**
 * Fires the callback in response to a screen resize event
 */
export const resizeScreen = ({
  onResize = noop
} = {}) => compress({
  [actions.resize]: safe(onResize)
})

/**
 * Reject system actions like the mounted key and tick streams, which are always
 * prefixed with @@
 */
export const debug = _ => scope(
  (state, event) => {
    return !(/^@/.test(event.type))
  },
  rawDebug(_)
)

/**
 * Render ion
 */
export const render = () => compress({
  [tickActions.tick]: safe((state, event) => {
    stats.begin()
    const { render } = getState(state.appState)

    render(state)
    stats.end()
  })
})
