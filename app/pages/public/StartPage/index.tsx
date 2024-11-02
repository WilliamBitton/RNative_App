import type { StackScreenProps } from '@react-navigation/stack'
import { Text, makeStyles } from '@rneui/themed'

import ButtonElement from '../../../components/ButtonElement'
import PageWrapper from '../../../components/PageWrapper'
import View from '../../../components/View'
import { useBottomSheetContext } from '../../../contexts/bottomSheetContext'
import type { SignedOutRouterParamList } from '../../../router/_routes'
import BottomSheetLegal from './Legal'
import BottomSheetPrivacy from './Privacy'
import BottomSheetTerms from './Terms'

type Props = StackScreenProps<SignedOutRouterParamList, 'StartPage'>

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: '32%',
    paddingBottom: '16%'
  },
  bottomSheetContainer: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bottomSheetTrigger: {
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  button: {
    width: '100%'
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})

function StartPage({ navigation }: Props): React.JSX.Element {
  const styles = useStyles()
  const { open: openBottomSheet } = useBottomSheetContext()
  const moveToSignInPage = () => {
    navigation.push('SignInPage')
  }

  const moveToSignUpPage = () => {
  }

  return (
    <PageWrapper transparent light>
      <View style={styles.parentContainer} ph24>
        <View style={styles.logo}>
        </View>
        <View>
          <ButtonElement
            title="Create account"
            color="primary"
            onPress={moveToSignUpPage}
            style={{ width: '100%' }}
            mb16
          />
          <ButtonElement
            title="Login"
            color="white"
            onPress={moveToSignInPage}
            style={{ width: '100%' }}
            mb24
          />
          <View style={styles.bottomSheetContainer}>
            <Text
              style={styles.bottomSheetTrigger}
              color="black"
              onPress={() => openBottomSheet(<BottomSheetTerms />)}>
              {'Terms'}
            </Text>
            <Text color="white" mh16>
              ×
            </Text>
            <Text
              style={styles.bottomSheetTrigger}
              color="black"
              onPress={() => openBottomSheet(<BottomSheetPrivacy />)}>
              {'Privacy'}
            </Text>
            <Text color="white" mh16>
              ×
            </Text>
            <Text
              style={styles.bottomSheetTrigger}
              color="black"
              onPress={() => openBottomSheet(<BottomSheetLegal />)}>
              {'Legal notice'}
            </Text>
          </View>
        </View>
      </View>
    </PageWrapper>
  )
}

export default StartPage
