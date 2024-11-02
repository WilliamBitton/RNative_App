import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomePage from '../pages/HomePage'
import type { HomeRouterParamList } from './_routes'
import SubstituteRequestsPage from '../pages/SubstituteRequestsPage'

const Stack = createNativeStackNavigator<HomeRouterParamList>()

function HomeRouter(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="SubstituteRequests" component={SubstituteRequestsPage} />
    </Stack.Navigator>
  )
}

export default HomeRouter
