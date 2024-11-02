import type { Colors } from '@rneui/themed'
import { Switch, Text, makeStyles, useTheme } from '@rneui/themed'
import type { StyleProp, ViewStyle } from 'react-native'
import { Platform } from 'react-native'

import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  value: boolean
  disabled?: boolean
  trackColor?: keyof Omit<Colors, 'platform'>
  textColor?: keyof Omit<Colors, 'platform'>
  thumbColor?: keyof Omit<Colors, 'platform'>
  label: string
  style?: StyleProp<ViewStyle>
  onValueChange?: (newValue: boolean) => void
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style, disabled, textColor } = props
  const color = textColor ? theme.colors[textColor] : theme.colors.black

  return {
    view: withSpacing(props, {
      flexDirection: 'row',
      alignItems: 'center',
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    label: {
      marginLeft: 12,
      color: disabled ? theme.colors.gray600 : color
    }
  }
})

function SwitchElement(props: Props): React.JSX.Element {
  const { disabled, label, value, trackColor, thumbColor, onValueChange } = props
  const styles = useStyles(props)
  const { theme } = useTheme()

  const colors = {
    trackColor: trackColor && !value ? theme.colors[trackColor] : theme.colors.gray200,
    thumbColor: theme.colors.gray600
  }

  if (disabled && !value) {
    colors.thumbColor = theme.colors.gray300
  } else if (disabled || value) {
    colors.thumbColor = theme.colors.darkGreen
  } else if (thumbColor && !value) {
    colors.thumbColor = theme.colors[thumbColor]
  }

  const iosTrackColor = Platform.OS === 'ios' && trackColor && !value ? theme.colors[trackColor] : undefined

  return (
    <View style={styles.view}>
      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        ios_backgroundColor={iosTrackColor}
        trackColor={{
          false: colors.trackColor,
          true: theme.colors.green
        }}
        thumbColor={colors.thumbColor}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

export default SwitchElement
