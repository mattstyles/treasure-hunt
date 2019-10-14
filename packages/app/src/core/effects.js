
import safe from 'raid-addons/lib/safe'
import compress from 'raid-addons/lib/compress'
import rawDebug from 'raid-addons/lib/debug'
import scope from 'raid-addons/lib/scope'
import { actions } from 'raid-streams/screen'

import { noop } from './utils'

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
