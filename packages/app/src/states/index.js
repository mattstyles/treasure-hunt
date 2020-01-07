
import actionkey from 'actionkey'

import initial from './initial'

export const appStates = actionkey('@app', [
  'initial',
  'running',
  'fin'
])

const idMap = {
  [appStates.initial]: initial
}

export const getState = id => {
  if (!id || !idMap[id]) {
    throw new Error('Application state not found')
  }

  return idMap[id]
}
