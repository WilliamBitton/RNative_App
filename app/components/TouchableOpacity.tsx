import { makeStyles } from '@rneui/themed'
import type { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'

import { type Spacings, flattenStyles, withSpacing } from '../utils/styles'

type Props = TouchableOpacityProps & Spacings

const useStyles = makeStyles((_theme, props: Props) => {
  const { style } = props

  return {
    view: withSpacing(props, {
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    })
  }
})

function TouchableOpacity(props: Props) {
  const { style, children, ...otherProps } = props

  const styles = useStyles(props)

  return (
    <RNTouchableOpacity {...otherProps} style={styles.view} activeOpacity={0.7}>
      {children}
    </RNTouchableOpacity>
  )
}

export default TouchableOpacity
