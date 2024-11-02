import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import type { Colors } from '@rneui/themed'
import { Divider, ListItem, Text, makeStyles } from '@rneui/themed'
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

import { useBottomSheetContext } from '../contexts/bottomSheetContext'
import { fonts } from '../utils/constants'
import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Data = {
  label: string
  value: string
}

type Props = Spacings & {
  style?: StyleProp<ViewStyle>
  label: string
  value: Data
  errorMessage?: string
  onChange: (newValue: Data) => void
  data: Data[]
  backgroundColor?: keyof Omit<Colors, 'platform'>
  textColor?: keyof Omit<Colors, 'platform'>
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style, textColor, backgroundColor } = props

  return {
    container: withSpacing(props, {
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    label: {
      fontFamily: fonts.regular,
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 18,
      marginBottom: 10,
      marginTop: 0,
      color: textColor ? theme.colors[textColor] : theme.colors.gray600
    },
    picker: {
      justifyContent: 'center',
      height: 48,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 6,
      backgroundColor: backgroundColor ? theme.colors[backgroundColor] : theme.colors.gray200
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 4
    },
    input: {
      color: theme.colors.black,
      fontSize: 16,
      fontFamily: fonts.bold,
      flex: 1
    },
    dropdown: {
      borderRadius: 6
    },
    items: {
      color: theme.colors.black
    },
    errorMessage: {
      color: theme.colors.primary,
      marginLeft: 15,
      fontSize: 12,
      lineHeight: 14
    },
    listItem: {
      backgroundColor: theme.colors.primary
    }
  }
})

function BottomSheet(props: Props, close: () => void): React.JSX.Element {
  const { data, onChange } = props

  return (
    <View style={{ paddingVertical: 6, borderRadius: 6, borderWidth: 1 }}>
      {data.map(item => (
        <View key={`${item.value} + view`}>
          <ListItem
            key={`${item.value} + listItem`}
            onPress={() => {
              onChange(item)
              close()
            }}>
            <ListItem.Content>
              <ListItem.Title>{item.value}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
          <Divider key={`${item.value} + divider`} />
        </View>
      ))}
    </View>
  )
}

function SelectElement(props: Props): React.JSX.Element {
  const styles = useStyles(props)
  const { onChange, value, errorMessage, label, data } = props
  const { open: openBottomSheet, close: closeBottomSheet } = useBottomSheetContext()

  if (data.length > 10) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity onPress={() => openBottomSheet(BottomSheet(props, closeBottomSheet))} style={styles.picker}>
          <View style={styles.inputContainer}>
            <Text style={styles.input}>{value.value}</Text>
            <FontAwesomeIcon icon={['fas', 'chevron-down']} />
          </View>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.picker}>
        <Dropdown
          value={value}
          onChange={onChange}
          data={data}
          selectedTextStyle={styles.input}
          itemTextStyle={styles.items}
          containerStyle={styles.dropdown}
          maxHeight={600}
          labelField="label"
          valueField="value"
        />
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  )
}
export default SelectElement