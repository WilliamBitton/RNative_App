import type { IconName } from '@fortawesome/fontawesome-svg-core'
import type { BottomTabNavigationOptions, BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { NavigatorScreenParams, RouteProp } from '@react-navigation/native'

// import type SubstituteRequestRecipient from '../models/substituteRequestRecipient'

export type TabRouterParamList = {
  HomeRouter: BottomTabScreenProps<HomeRouterParamList>
  SettingsRouter: BottomTabScreenProps<SettingsRouterParamList>
  AboutRouter: BottomTabScreenProps<AboutRouterParamList>
}

export type TabRouterScreenOptions = (props: {
  route: RouteProp<TabRouterParamList, keyof TabRouterParamList>
}) => BottomTabNavigationOptions

export type TabRouterScreenOptionsSet = {
  icon: IconName
  label: string
}

export type SignedOutRouterParamList = {
  StartPage: undefined
  SignInPage: undefined
  SignUpPage: undefined
}

export type MainRouterParamList = {
  TabNavigator: NavigatorScreenParams<TabRouterParamList>
  StyleguidePageModal: undefined
  // SubstituteRequestResponse: {
  //   requestRecipient: SubstituteRequestRecipient
  // }
}

export type HomeRouterParamList = {
  Home: undefined
  SubstituteRequests: undefined
  SubstituteRequest: {
    slug: string
  }
}

export type SettingsRouterParamList = {
  Settings: undefined
  Styleguide: undefined
  Notifications: undefined
  Gallery: undefined
}

export type AboutRouterParamList = {
  About: undefined
}
