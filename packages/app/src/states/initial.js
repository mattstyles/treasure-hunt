
import { AppState } from './appState'

class State extends AppState {
  static name = 'initial'

  render (state) {
    console.log('initial state :: rendering', state)
  }
}

export const state = new State()
