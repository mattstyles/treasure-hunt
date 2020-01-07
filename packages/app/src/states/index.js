
import actionkey from 'actionkey'

import { state as initialState } from './initial'

export const appStates = actionkey('@app', [
  'initial',
  'running',
  'fin'
])

const idMap = {
  [appStates.initial]: initialState
}

export const getState = id => {
  if (!id || !idMap[id]) {
    throw new Error('Application state not found')
  }

  return idMap[id]
}
