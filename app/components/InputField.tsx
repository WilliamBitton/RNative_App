import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import type { Colors } from '@rneui/themed'
import { Input, Text, makeStyles } from '@rneui/themed'
import { useMemo, useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { fonts } from '../utils/constants'
import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  onBlur?: () => void
  onChangeText?: (newValue: string) => void
  onLinkPress?: () => void
  onIconPress?: () => void
  value?: string
  errorMessage?: string
  label?: string
  icon?: IconProp
  placeholder?: string
  password?: boolean
  linkTitle?: string
  style?: StyleProp<ViewStyle>
  backgroundColor?: keyof Omit<Colors, 'platform'>
  textColor?: keyof Omit<Colors, 'platform'>
  reset?: boolean
  disabled?: boolean
  autoCorrect?: boolean
  long?: boolean
  rows?: number
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style, backgroundColor, textColor } = props

  return {
    container: withSpacing(props, {
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    inputContainer: {
      borderRadius: 6,
      opacity: 1,
      borderBottomWidth: 0,
      marginHorizontal: -10,
      backgroundColor: backgroundColor ? theme.colors[backgroundColor] : theme.colors.gray200
    },
    label: {
      fontFamily: fonts.regular,
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 18,
      marginBottom: 10,
      marginHorizontal: -10,
      color: textColor ? theme.colors[textColor] : theme.colors.gray600
    },
    input: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 21,
      marginHorizontal: 16,
      alignItems: 'center',
      color: theme.colors.black,
      height: 48 * (props.long ? (props.rows ?? 7) / 2 : 1)
    },
    linkContainer: {
      position: 'absolute',
      right: 0
    },
    textLink: {
      fontSize: 14,
      lineHeight: 18,
      textDecorationLine: 'underline',
      color: textColor ? theme.colors[textColor] : theme.colors.gray600
    },
    icon: {
      marginRight: 16
    },
    errorMessage: {
      color: theme.colors.primary,
      fontFamily: fonts.regular,
      marginHorizontal: -10,
      marginTop: 10
    }
  }
})

function InputField(props: Props): React.JSX.Element {
  const {
    label,
    placeholder,
    password,
    errorMessage,
    icon,
    onBlur,
    onChangeText,
    onLinkPress,
    onIconPress,
    linkTitle,
    value,
    reset,
    disabled,
    autoCorrect,
    long,
    rows
  } = props
  const styles = useStyles(props)
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState)
  }

  const rightIcon = useMemo(() => {
    if (password) {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <FontAwesomeIcon icon={showPassword ? ['fas', 'eye'] : ['fas', 'eye-slash']} size={20} style={styles.icon} />
        </TouchableOpacity>
      )
    }

    if (reset) {
      return (
        <TouchableOpacity
          onPress={() => {
            if (onChangeText) {
              onChangeText('')
            }
          }}>
          <FontAwesomeIcon icon={['fas', 'trash']} style={styles.icon} size={20} />
        </TouchableOpacity>
      )
    }

    if (icon) {
      return (
        <TouchableOpacity onPress={onIconPress}>
          <FontAwesomeIcon icon={icon} style={styles.icon} size={20} />
        </TouchableOpacity>
      )
    }

    return undefined
  }, [icon, onChangeText, onIconPress, password, reset, showPassword, styles])

  if (long)
    return (
      <View style={styles.container}>
        <Input
          multiline
          numberOfLines={rows ?? 7}
          label={label}
          placeholder={placeholder}
          defaultValue={value}
          onChangeText={onChangeText}
          autoCorrect={autoCorrect}
          onBlur={onBlur}
          autoCapitalize={autoCorrect ? 'sentences' : 'none'}
          errorMessage={errorMessage}
          inputStyle={styles.input}
          labelStyle={styles.label}
          disabled={disabled}
          inputContainerStyle={styles.inputContainer}
          errorStyle={styles.errorMessage}
        />
      </View>
    )

  return (
    <View style={styles.container}>
      <Input
        autoCapitalize={autoCorrect ? 'sentences' : 'none'}
        autoCorrect={autoCorrect}
        onBlur={onBlur}
        onChangeText={onChangeText}
        defaultValue={value}
        placeholder={placeholder}
        errorMessage={errorMessage}
        label={label}
        rightIcon={rightIcon}
        secureTextEntry={password && !showPassword}
        labelStyle={styles.label}
        inputStyle={styles.input}
        disabled={disabled}
        inputContainerStyle={styles.inputContainer}
        errorStyle={styles.errorMessage}
      />

      {typeof linkTitle !== 'undefined' && typeof onLinkPress !== 'undefined' && (
        <TouchableOpacity onPress={onLinkPress} style={styles.linkContainer}>
          <Text style={styles.textLink}>{linkTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default InputField
