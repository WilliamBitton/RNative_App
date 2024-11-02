import { Text, makeStyles } from '@rneui/themed'
import { type StyleProp, type ViewStyle } from 'react-native'

import { fonts } from '../utils/constants'
import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  title: string
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style } = props

  return {
    titleContainer: withSpacing(props, {
      alignSelf: 'flex-start',
      borderRadius: 6,
      backgroundColor: theme.colors.gray200,
      paddingVertical: 4,
      paddingHorizontal: 16,
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    title: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 21,
      color: theme.colors.black
    }
  }
})

function SectionHeader(props: Props): React.JSX.Element {
  const { title } = props
  const styles = useStyles(props)

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default SectionHeader
