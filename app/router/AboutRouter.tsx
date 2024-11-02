import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AboutPage from '../pages/AboutPage'
import type { AboutRouterParamList } from './_routes'

const Stack = createNativeStackNavigator<AboutRouterParamList>()

function AboutRouter(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="About" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="About" component={AboutPage} />
    </Stack.Navigator>
  )
}

export default AboutRouter
