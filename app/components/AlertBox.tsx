import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import type { Colors } from '@rneui/themed'
import { Text, makeStyles, useTheme } from '@rneui/themed'
import type { StyleProp, ViewStyle } from 'react-native'

import { whiteTextBackgrounds } from '../utils/constants'
import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  title: string
  message: string
  icon?: IconProp
  style?: StyleProp<ViewStyle>
  color?: keyof Omit<Colors, 'platform'>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { color, style } = props

  return {
    container: withSpacing(props, {
      backgroundColor: color ? theme.colors[color] : theme.colors.primary,
      borderRadius: 6,
      alignItems: 'flex-start',
      borderColor: theme.colors.gray300,
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    title: {
      fontSize: 16,
      lineHeight: 20
    },
    message: {
      fontSize: 14,
      lineHeight: 18
    }
  }
})

function AlertBox(props: Props): React.JSX.Element {
  const styles = useStyles(props)
  const { icon, title, message, color } = props
  const { theme } = useTheme()
  const textColor = whiteTextBackgrounds.includes(color ?? 'primary') ? 'white' : 'black'

  return (
    <View style={styles.container} pv16 ph16>
      {icon && <FontAwesomeIcon icon={icon} size={16} color={theme.colors[textColor]} />}
      <Text bold mt24={Boolean(icon)} style={styles.title} color={textColor} mb8>
        {title}
      </Text>
      <Text color={textColor} style={styles.message}>
        {message}
      </Text>
    </View>
  )
}

export default AlertBox
