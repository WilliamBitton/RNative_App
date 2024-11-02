import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native'
import type { Colors } from '@rneui/themed'
import { Button, Text, makeStyles, useTheme } from '@rneui/themed'
import type { PropsWithChildren, ReactNode } from 'react'
import { useCallback, useMemo } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native'
import { Animated, ScrollView, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useScrollingTitleContext } from '../contexts/scrollingTitleContext'
import { fonts } from '../utils/constants'
import { flattenStyles } from '../utils/styles'
import View from './View'

type Props = {
  withBackButton?: boolean
  withRightButton?: string
  onPress?: () => undefined
  title?: string
  color?: keyof Omit<Colors, 'platform'>
  transparent?: boolean
  light?: boolean
  scrollingTitle?: boolean
  style?: StyleProp<ViewStyle>
  inset?: boolean
}

const useStyles = makeStyles((theme, { style, transparent }: Props) => ({
  container: {
    flex: 1,
    backgroundColor: transparent ? 'transparent' : theme.colors.white
  },
  scrollContainer: {
    flex: 1,
    ...(typeof style === 'object' && style != null ? flattenStyles(style) : {})
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80,
    flexGrow: 0
  },
  sectionCenter: {
    alignItems: 'center',
    overflowX: 'hidden',
    flexGrow: 1
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: theme.colors.black
  },
  sectionRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 80,
    flexGrow: 0
  },
  buttonRightText: {
    fontSize: 16,
    color: theme.colors.primary
  }
}))

function PageWrapper(props: PropsWithChildren<Props>): React.JSX.Element {
  const { children, onPress, title, withBackButton, withRightButton, color, scrollingTitle, light, inset } = props
  const styles = useStyles(props)
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  const { theme } = useTheme()
  const { position } = useScrollingTitleContext()

  const opacity = useMemo(() => new Animated.Value(0), [])

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let targetOpacity = 1
      const { y } = event.nativeEvent.contentOffset
      if (y < position.start) targetOpacity = 0
      else if (y > position.end) targetOpacity = 1
      else {
        targetOpacity = (y - position.start) / (position.end - position.start)
      }

      opacity.setValue(targetOpacity)
    },
    [opacity, position]
  )

  const memoizedChildren = useMemo<ReactNode>(() => {
    if (scrollingTitle)
      return (
        <ScrollView style={styles.scrollContainer} scrollEventThrottle={16} onScroll={event => handleScroll(event)}>
          {children}
        </ScrollView>
      )
    return children
  }, [children, handleScroll, scrollingTitle, styles.scrollContainer])

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: inset ? insets.bottom : undefined,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}>
      <StatusBar barStyle={light ? 'light-content' : 'dark-content'} />
      {(withBackButton || title) && (
        <View style={styles.titleContainer} pv16>
          <View style={styles.sectionLeft}>
            <Button type="clear" onPress={navigation.goBack}>
              <FontAwesomeIcon icon={['fas', 'arrow-left']} color={theme.colors[color ?? 'primary']} size={24} />
            </Button>
          </View>
          <View style={styles.sectionCenter}>
            {title && (
              <Animated.View style={{ opacity }}>
                <Text style={styles.title}>{title}</Text>
              </Animated.View>
            )}
          </View>
          <View style={styles.sectionRight}>
            {withRightButton ? (
              <Button type="clear" onPress={onPress}>
                <Text style={styles.buttonRightText}>{withRightButton}</Text>
              </Button>
            ) : null}
          </View>
        </View>
      )}
      {memoizedChildren}
    </View>
  )
}

export default PageWrapper
