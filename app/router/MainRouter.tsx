import { createStackNavigator } from '@react-navigation/stack'
import StyleguidePageModal from '../pages/Modal'
import TabRouter from './TabRouter'
import type { MainRouterParamList } from './_routes'

const RootStack = createStackNavigator<MainRouterParamList>()

function MainRouter(): React.JSX.Element {
  // Bootstrap sequence function
  // async function bootstrap() {
  //   if (Platform.OS === 'ios') {
  //     const initialNotification = await notifee.getInitialNotification()
  //     if (initialNotification?.notification?.data != null && 'url' in initialNotification.notification.data) {
  //       Alert.alert(JSON.stringify(initialNotification.notification.data.url))
  //     }
  //   }
  // }

  // useEffect(() => {
  //   bootstrap().catch(console.error)
  //   const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
  //     if (type === EventType.PRESS && detail.notification?.data != null && 'url' in detail.notification.data) {
  //       Alert.alert(`${JSON.stringify(detail.notification.data.url)}`)
  //     }
  //   })

  //   const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
  //     Alert.alert(JSON.stringify(remoteMessage.data))
  //   })

  //   return () => {
  //     unsubscribeNotifee()
  //     unsubscribeBackground()
  //   }
  // }, [])

  return (
    <RootStack.Navigator initialRouteName="TabNavigator" screenOptions={{ headerShown: false }}>
      <RootStack.Group>
        <RootStack.Screen name="TabNavigator" component={TabRouter} />
      </RootStack.Group>

      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen name="StyleguidePageModal" component={StyleguidePageModal} />
        {/* <RootStack.Screen name="SubstituteRequestResponse" component={SubstituteRequestResponse} /> */}
      </RootStack.Group>
    </RootStack.Navigator>
  )
}

export default MainRouter
