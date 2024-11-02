import { createNativeStackNavigator } from '@react-navigation/native-stack'

import NotificationsPage from '../pages/NotificationsPage'
import GalleryPage from '../pages/GalleryPage'
import SettingsPage from '../pages/SettingsPage'
import StyleguidePage from '../pages/StyleguidePage'
import type { SettingsRouterParamList } from './_routes'

const Stack = createNativeStackNavigator<SettingsRouterParamList>()

function SettingsRouter(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsPage} />
      <Stack.Screen name="Styleguide" component={StyleguidePage} />
      <Stack.Screen name="Notifications" component={NotificationsPage} />
      <Stack.Screen name="Gallery" component={GalleryPage} />
    </Stack.Navigator>
  )
}

export default SettingsRouter
