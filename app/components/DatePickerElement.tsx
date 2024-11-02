import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import type { Colors } from '@rneui/themed'
import { Text, makeStyles } from '@rneui/themed'
import { useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import DatePicker from 'react-native-date-picker'

import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import TouchableOpacity from './TouchableOpacity'
import View from './View'

type Props = Spacings & {
  style?: StyleProp<ViewStyle>
  value: Date
  errorMessage?: string
  onChange: (newValue: Date) => void
  backgroundColor?: keyof Omit<Colors, 'platform'>
  textColor?: keyof Omit<Colors, 'platform'>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style, backgroundColor } = props

  return {
    container: withSpacing(props, {
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    touchableOpacity: {
      backgroundColor: backgroundColor ? theme.colors[backgroundColor] : theme.colors.gray200,
      borderRadius: 6,
      height: 48,
      flexDirection: 'row'
    },
    text: {
      fontSize: 16,
      lineHeight: 17,
      flex: 1
    },
    errorMessage: {
      fontSize: 12,
      lineHeight: 14
    },
    label: {
      fontSize: 14,
      lineHeight: 18
    }
  }
})

function DatePickerElement(props: Props): React.JSX.Element {
  const styles = useStyles(props)
  const { value, onChange, errorMessage, textColor } = props
  const [open, setOpen] = useState(false)
  const formattedDate = value.toLocaleDateString()

  return (
    <View style={styles.container}>
      <Text style={styles.label} mb8 color={textColor ?? 'gray600'}>
        Date
      </Text>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.touchableOpacity} ph24>
        <Text bold mt16 style={styles.text}>
          {formattedDate}
        </Text>
        <View mt16>
          <FontAwesomeIcon icon={['fas', 'chevron-down']} size={20} />
        </View>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={value}
        onConfirm={dateSelected => {
          setOpen(false)
          onChange(dateSelected)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      {errorMessage && (
        <Text style={styles.errorMessage} ml16 color="primary">
          {errorMessage}
        </Text>
      )}
    </View>
  )
}

export default DatePickerElement
