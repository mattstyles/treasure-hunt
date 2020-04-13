
import { Navigator } from '@raid/navigator'

import { connect, signal } from 'signals'
import { routes, history, getNavigation } from 'core/routing'

import { Main } from 'views/main'

const AppNavigation = ({
  navigation
}) => {
  return (
    <Navigator
      signal={signal}
      navigation={navigation}
      history={history}
      storage={null}
    >
      <Main route={routes.home} />
    </Navigator>
  )
}

export const Navigation = connect(
  getNavigation,
  AppNavigation
)
