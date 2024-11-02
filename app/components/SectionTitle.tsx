import { Text, makeStyles } from '@rneui/themed'
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native'

import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  title: string
  link?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style } = props

  return {
    container: withSpacing(props, {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    })
  }
})

function SectionTitle(props: Props): React.JSX.Element {
  const { title, link, onPress } = props
  const styles = useStyles(props)

  return (
    <View style={styles.container} mb16>
      <Text h2>{title}</Text>
      <View style={{ flex: 1 }} />
      <TouchableOpacity onPress={onPress}>
        <Text h4>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SectionTitle
