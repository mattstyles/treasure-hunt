
import safe from 'raid-addons/lib/safe'
import patch from 'raid-addons/lib/patch'
import compress from 'raid-addons/lib/compress'
import { actions } from 'raid-streams/screen'

const onResize = patch('config', (config, payload) => {
  return {
    ...config,
    sw: payload.width,
    sh: payload.height
  }
})

export const appUpdates = compress({
  [actions.resize]: safe(onResize)
})
