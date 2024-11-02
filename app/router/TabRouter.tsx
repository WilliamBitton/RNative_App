import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTheme } from '@rneui/themed'
import { type ReactNode, useCallback } from 'react'

import AboutRouter from './AboutRouter'
import HomeRouter from './HomeRouter'
import SettingsRouter from './SettingsRouter'
import type { TabRouterParamList, TabRouterScreenOptions, TabRouterScreenOptionsSet } from './_routes'

const Tab = createBottomTabNavigator<TabRouterParamList>()
const tabBarScreenOptions: Record<keyof TabRouterParamList, TabRouterScreenOptionsSet> = {
  AboutRouter: {
    icon: 'info-circle',
    label: 'About'
  },
  HomeRouter: {
    icon: 'home',
    label: 'Home'
  },
  SettingsRouter: {
    icon: 'circle-user',
    label: 'Account'
  }
}

function TabRouter(): React.JSX.Element {
  const { theme } = useTheme()

  const screenOptions = useCallback<TabRouterScreenOptions>(
    ({ route }): BottomTabNavigationOptions => ({
      headerShown: false,
      // Here this is a safe nested components, because we want to redraw all the time anyway
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ focused, color, size }): ReactNode => (
        <FontAwesomeIcon icon={['fas', tabBarScreenOptions[route.name].icon]} size={size} color={color} />
      ),
      tabBarLabel: tabBarScreenOptions[route.name].label,
      tabBarActiveTintColor: theme.colors.black,
      tabBarInactiveTintColor: theme.colors.gray600
    }),
    [theme]
  )

  return (
    <Tab.Navigator initialRouteName="HomeRouter" screenOptions={screenOptions}>
      <Tab.Screen name="HomeRouter" component={HomeRouter} />
      <Tab.Screen name="SettingsRouter" component={SettingsRouter} />
      <Tab.Screen name="AboutRouter" component={AboutRouter} />
    </Tab.Navigator>
  )
}

export default TabRouter
