import { makeStyles } from '@rneui/themed'
import type { Colors } from '@rneui/themed'
import { useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import ButtonElement from './ButtonElement'
import View from './View'

type Props = Spacings & {
  value: boolean
  color: keyof Omit<Colors, 'platform'>
  onChange?: (newValue: boolean) => void
  style?: StyleProp<ViewStyle>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style } = props

  return {
    container: withSpacing(props, {
      backgroundColor: 'white',
      flexDirection: 'row',
      width: '100%',
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1.5
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
      borderRadius: 6,
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    selectedButtonContainer: {
      width: '50%'
    },
    unselectedButtonContainer: {
      width: '50%'
    },
    first: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      width: '100%'
    },
    last: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      width: '100%'
    }
  }
})

function ComboElement(props: Props): React.JSX.Element {
  const { color, value, onChange } = props
  const styles = useStyles(props)
  const [selectedButton, setSelectedButton] = useState(value)
  const handleButtonPress = (button: boolean) => {
    if (onChange) onChange(button)
    setSelectedButton(button)
  }

  return (
    <View style={styles.container}>
      <View style={selectedButton ? styles.selectedButtonContainer : styles.unselectedButtonContainer}>
        <ButtonElement
          title="Yes"
          style={styles.first}
          color={selectedButton ? color : 'white'}
          onPress={() => handleButtonPress(true)}
        />
      </View>
      <View style={!selectedButton ? styles.selectedButtonContainer : styles.unselectedButtonContainer}>
        <ButtonElement
          title="No"
          style={styles.last}
          color={!selectedButton ? color : 'white'}
          onPress={() => handleButtonPress(false)}
        />
      </View>
    </View>
  )
}

export default ComboElement
