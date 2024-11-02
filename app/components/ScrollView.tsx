import { makeStyles } from '@rneui/themed'
import type { ScrollViewProps } from 'react-native'
import { ScrollView as RNScrollView } from 'react-native'

import { type Spacings, flattenStyles, withSpacing } from '../utils/styles'

type Props = ScrollViewProps & Spacings

const useStyles = makeStyles((_theme, props: Props) => {
  const { style } = props

  return {
    view: withSpacing(props, {
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    })
  }
})

function ScrollView(props: Props) {
  const { style, children, ...otherProps } = props

  const styles = useStyles(props)

  return (
    <RNScrollView {...otherProps} style={styles.view}>
      {children}
    </RNScrollView>
  )
}

export default ScrollView
