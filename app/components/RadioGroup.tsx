import { Text, makeStyles } from '@rneui/themed'
import type { StyleProp, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native'

import { type Spacings, withSpacing } from '../utils/styles'
import View from './View'

type Radio = {
  label: string
  disabled?: true
  value: string
}

type Props = Spacings & {
  radioList: Radio[]
  value: string
  onValueChange: (newValue: string) => void
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => ({
  parentContainer: withSpacing(props, {
    ...(typeof props.style === 'object' ? props.style : {})
  }),
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    textAlign: 'left',
    marginVertical: 8 // TODO Determine if withSpacing should affect each radio button, or the entire radio group like atm
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: theme.colors.gray200
  },
  green: {
    backgroundColor: theme.colors.green
  },
  innerRadio: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.darkGreen
  },
  text: {
    alignSelf: 'center'
  },
  textDisabled: {
    alignSelf: 'center',
    color: theme.colors.gray600
  },
  opacity: {
    opacity: 0.5
  }
}))

function RadioGroup(props: Props): React.JSX.Element {
  const { radioList, value, onValueChange } = props
  const styles = useStyles(props)

  return (
    <View style={styles.parentContainer}>
      {radioList.map(radio =>
        radio.disabled ? (
          <View key={radio.label} style={styles.container}>
            <View style={[styles.radioButton, radio.value === value && styles.green]}>
              {radio.value === value && <View style={[styles.innerRadio, styles.opacity]} />}
            </View>
            <Text style={styles.textDisabled}>{radio.label}</Text>
          </View>
        ) : (
          <TouchableOpacity key={radio.label} onPress={() => onValueChange(radio.value)} style={styles.container}>
            <View style={[styles.radioButton, radio.value === value && styles.green]}>
              {radio.value === value && <View style={styles.innerRadio} />}
            </View>
            <Text style={styles.text}>{radio.label}</Text>
          </TouchableOpacity>
        )
      )}
    </View>
  )
}

export default RadioGroup
