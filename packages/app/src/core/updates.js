
import safe from 'raid-addons/lib/safe'
import compress from 'raid-addons/lib/compress'
import { actions } from 'raid-streams/screen'

const onResize = (state, payload) => {
  return {
    ...state,
    config: {
      ...state.config,
      sw: payload.width,
      sh: payload.height
    }
  }
}

export const appUpdates = compress({
  [actions.resize]: safe(onResize)
})
