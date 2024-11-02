import { makeStyles } from '@rneui/themed'
import { useState } from 'react'

import PageWrapper from '../components/PageWrapper'
import ScrollingTitle from '../components/ScrollingTitle'
import SwitchElement from '../components/SwitchElement'
import View from '../components/View'

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    height: '100%'
  }
})

// async function requestNotifications(): Promise<boolean> {
//   await notifee.requestPermission()

//   const { status } = await checkNotifications()

//   return status === 'granted'
// }

function NotificationsPage(): React.JSX.Element {
  const styles = useStyles()
  const [notificationsEnabled, setIsNotificationsEnabled] = useState(false)
  const [substitutesNotificationsEnabled, setSubstitutesNotificationsEnabled] = useState(false)
  // const loggedInAccount = useUserStore(state => state.loggedInAccount)
  // const setAccount = useUserStore(state => state.setAccount)

  // const doRequestNotifications = (): void => {
  //   requestNotifications()
  //     .then(value => setIsNotificationsEnabled(value))
  //     .catch(error => console.log(error))
  // }

  // const changeSubstitutesNotificationsEnabled = (value: boolean) => {
  //   setSubstitutesNotificationsEnabled(value)
  //   loggedInAccount
  //     ?.setSubstitutesNotifications(value)
  //     .then(() => {
  //       setAccount(loggedInAccount)
  //     })
  //     .catch(error => console.log(error))
  // }

  // useEffect(() => {
  //   checkNotifications()
  //     .then(({ status }) => setIsNotificationsEnabled(status === 'granted'))
  //     .catch(error => console.log(error))

  //   if (
  //     loggedInAccount?.FCMToken &&
  //     loggedInAccount?.pushTokens.find(token => token.token === loggedInAccount.FCMToken)
  //   )
  //     setSubstitutesNotificationsEnabled(true)
  // }, [loggedInAccount])

  return (
    <PageWrapper scrollingTitle title={'Notifications'}>
      <View style={styles.parentContainer} ph24>
        <ScrollingTitle title={'Notifications'} />
        <View mt8>
          <SwitchElement
            // onValueChange={doRequestNotifications}
            value={notificationsEnabled}
            disabled={notificationsEnabled}
            label="System Notifications"
            mv8
          />
          {/* <ButtonElement
            title="Open system notification settings"
            link
            onPress={() => {
              openSettings().catch(error => console.log(error))
            }}
          />
          {notificationsEnabled && (
            <SwitchElement
              onValueChange={changeSubstitutesNotificationsEnabled}
              value={substitutesNotificationsEnabled}
              label="Enable Push Notifications for substitutes"
              mv8
            />
          )} */}
        </View>
      </View>
    </PageWrapper>
  )
}

export default NotificationsPage
