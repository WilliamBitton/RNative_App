import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { Colors } from '@rneui/themed'
import { Image, Text, makeStyles } from '@rneui/themed'
import { type StyleProp, type ViewStyle } from 'react-native'

import { type Spacings, flattenStyles, withSpacing } from '../utils/styles'
import ButtonElement from './ButtonElement'
import TouchableOpacity from './TouchableOpacity'
import View from './View'

type Props = Spacings & {
  title: string
  subtitle?: string
  imageSrc?: string
  onPress?: () => undefined
  icon?: IconProp
  iconColor?: keyof Omit<Colors, 'platform'>
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style } = props

  return {
    container: withSpacing(props, {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1.5
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    title: {
      color: theme.colors.black,
      fontSize: 16,
      lineHeight: 17
    },
    subtitle: {
      color: theme.colors.gray600,
      fontSize: 14,
      lineHeight: 17
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      flexGrow: 1
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20
    },
    button: {
      borderRadius: 14,
      width: 28,
      height: 28
    }
  }
})

function BoxListItem(props: Props): React.JSX.Element {
  const { title, subtitle, imageSrc, onPress, icon, iconColor } = props
  const styles = useStyles(props)

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} pv16 ph16>
      {imageSrc && <Image source={{ uri: imageSrc }} containerStyle={styles.image} />}
      <View pl16 style={styles.textContainer}>
        <Text bold style={styles.title}>
          {title}
        </Text>
        {subtitle && (
          <Text color="gray600" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>
      {icon && (
        <ButtonElement
          onPress={onPress}
          icon={icon}
          color={iconColor || 'primary'}
          iconSize={16}
          style={styles.button}
        />
      )}
    </TouchableOpacity>
  )
}

export default BoxListItem
