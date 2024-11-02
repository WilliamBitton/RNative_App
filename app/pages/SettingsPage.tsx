import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Divider, makeStyles } from '@rneui/themed'

import ButtonElement from '../components/ButtonElement'
import ListItemElement from '../components/ListItemElement'
import PageWrapper from '../components/PageWrapper'
import View from '../components/View'
import type { SettingsRouterParamList } from '../router/_routes'
import useLoginStore from '../stores/login'
import AccountCard from '../components/AccountCard'

type Props = NativeStackScreenProps<SettingsRouterParamList, 'Settings'>

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 24
  },
  logo: {
    marginTop: 24,
    marginBottom: 27
  },
  accountCard: {
    marginTop: 8,
    marginBottom: 16
  },
  listElement: {
    marginVertical: 8
  },
  divider: {
    marginTop: 24,
    marginBottom: 32
  },
  logOutButton: {
    width: '100%',
    marginTop: 32,
    marginBottom: 5
  },
  empty: {
    flex: 1
  }
})

function SettingsPage({ navigation }: Props): React.JSX.Element {
  const styles = useStyles()
  const goToStyles = () => navigation.navigate('Styleguide')
  const goToNotifications = () => navigation.navigate('Notifications')
  const goToGallery = () => navigation.navigate('Gallery')
  const loggedInAccount = useLoginStore(state => state.loggedInAccount)

  // const doSignOut = useMutation({
  //   mutationFn: async () => {
  //     await loggedInAccount?.signOut();
  //   },
  // });

  return (
    <PageWrapper>
      <View style={styles.parentContainer} mt16 pb32>
      <AccountCard style={styles.accountCard} />
        <ListItemElement
          title="Go to style guide"
          onPress={goToStyles}
          icon={['fas', 'info-circle']}
          rightIcon={['fas', 'arrow-right']}
          style={styles.listElement}
        />
        <ListItemElement
          title={'Notifications'}
          onPress={goToNotifications}
          icon={['fas', 'info-circle']}
          rightIcon={['fas', 'arrow-right']}
          style={styles.listElement}
        />
        <ListItemElement
          title={'Gallery'}
          onPress={goToGallery}
          icon={['fas', 'info-circle']}
          rightIcon={['fas', 'arrow-right']}
          style={styles.listElement}
        />
        <View style={styles.empty} />
        <Divider style={styles.divider} />
        <ButtonElement
          color="primary"
          title="Logout"
          onPress={() => {
            loggedInAccount?.signOut()
          }}
          style={{ width: '100%' }}
        />
      </View>
    </PageWrapper>
  )
}

export default SettingsPage
