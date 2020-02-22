
import { View } from 'react-basic-kit'

import { Map } from 'components/map'

export const Main = ({ state }) => {
  return (
    <View sx={{ p: 4 }}>
      <Map
        viewport={[64, 48]}
        scale={1}
        cellSize={[10, 10]}
      />
    </View>
  )
}
