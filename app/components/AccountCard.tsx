import { Text, makeStyles } from '@rneui/themed'
import type { StyleProp, ViewStyle } from 'react-native'

import useLoginStore from '../stores/login'
import { type Spacings, flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style } = props

  return {
    container: withSpacing(props, {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.shadow,
      borderColor: theme.colors.gray200,
      borderWidth: 1,
      padding: 16,
      borderRadius: 6,
      gap: 4,
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    })
  }
})

function AccountCard(props: Props): React.JSX.Element {
  const styles = useStyles(props)
  const loggedInAccount = useLoginStore(state => state.loggedInAccount)

  if (loggedInAccount === null) {
    return <View />
  }

  return (
    <View style={styles.container} ph16 pv16>
      {loggedInAccount.admin && <Text color="primary">ADMIN</Text>}
      <Text h2>{loggedInAccount.fullName}</Text>
      <Text>Member since June 17th 2024</Text>
    </View>
  )
}

export default AccountCard
