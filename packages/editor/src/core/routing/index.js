
import { createActions } from '@raid/navigator'
import { createMemoryHistory } from 'history'
import { prop } from 'rambda'

export { routes } from './routes'

export const history = createMemoryHistory()
export const actions = createActions(history)

export const events = {
  push: 'navigation:push',
  pop: 'navigation:pop'
}

export const push = ({
  route
}) => {
  actions.push(route)
}

export const pop = () => {
  actions.back()
}

export const getNavigation = prop('navigation')
