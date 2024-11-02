import type { StackScreenProps } from '@react-navigation/stack'
import { Text, makeStyles } from '@rneui/themed'
import { View } from 'react-native'

import ButtonElement from '../components/ButtonElement'
import type { MainRouterParamList } from '../router/_routes'

type Props = StackScreenProps<MainRouterParamList, 'StyleguidePageModal'>

const useStyles = makeStyles({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function Modal({ navigation }: Props): React.JSX.Element {
  const styles = useStyles()
  return (
    <View style={styles.container}>
      <Text>Modal Screen</Text>
      <ButtonElement onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

export default Modal
