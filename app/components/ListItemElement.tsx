import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ListItem, makeStyles, useTheme } from '@rneui/themed'
import type { StyleProp, ViewStyle } from 'react-native'

import { fonts } from '../utils/constants'
import type { Spacings } from '../utils/styles'
import { flattenStyles, withSpacing } from '../utils/styles'
import View from './View'

type Props = Spacings & {
  title: string
  subTitle?: string
  icon: IconProp
  rightIcon?: IconProp
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const useStyles = makeStyles((theme, props: Props) => {
  const { style, subTitle } = props

  return {
    container: withSpacing(props, {
      padding: 0,
      paddingTop: subTitle ? 5 : 14,
      alignItems: 'flex-start',
      width: '100%',
      backgroundColor: 'transparent',
      ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
    }),
    title: {
      flex: 1,
      fontSize: 16,
      fontFamily: fonts.bold,
      lineHeight: 17,
      color: theme.colors.black
    },
    subTitle: {
      flex: 1,
      fontSize: 14,
      fontFamily: 'Gilroy',
      lineHeight: 17,
      color: theme.colors.gray600
    },
    iconContainer: {
      backgroundColor: theme.colors.gray200,
      padding: 14,
      borderRadius: 50,
      marginTop: subTitle ? -5 : -14
    },
    rightIconContainer: {
      padding: 14,
      marginRight: -14,
      marginTop: subTitle ? -5 : -14
    }
  }
})

function ListItemElement(props: Props): React.JSX.Element {
  const { icon, rightIcon, title, subTitle, onPress } = props
  const styles = useStyles(props)
  const { theme } = useTheme()

  return (
    <ListItem onPress={onPress} containerStyle={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon icon={icon} size={16} color={theme.colors.gray800} />
      </View>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        {subTitle && <ListItem.Subtitle style={styles.subTitle}>{subTitle}</ListItem.Subtitle>}
      </ListItem.Content>
      <View style={styles.rightIconContainer}>{rightIcon && <FontAwesomeIcon icon={rightIcon} size={16} />}</View>
    </ListItem>
  )
}

export default ListItemElement
