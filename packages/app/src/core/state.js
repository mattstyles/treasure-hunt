
import { Signal } from 'raid'
import { plug } from '@raid/addons/lib/plug'
import { lock } from '@raid/addons/lib/lock'
import arc from '@raid/addons/lib/arc'

import { appStates } from '../states/index'
import { getScreenSize } from './app'

const initial = {
  appState: appStates.initial,
  config: {
    ...getScreenSize()
  }
}

export const signal = Signal.of(initial)
export const connect = plug(signal)
export const keyLock = lock(signal)
export const ion = arc(signal)
export const dispatch = type => payload => signal.emit({ type, payload })
export const emit = (type, payload) => signal.emit({ type, payload })
