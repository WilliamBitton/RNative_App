import { makeStyles } from '@rneui/themed'
import type { PropsWithChildren } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, PanResponder } from 'react-native'

import { bottomSheetDragThresh } from '../utils/constants'
import ScrollView from './ScrollView'
import View from './View'

// TODO Both these lines need to be changed to be dynamic and reactive
const { width: screenWidth, height: screenHeight } = Dimensions.get('window')
const bottomSheetHeight = screenHeight * 0.7

type Props = {
  onClose: () => void
}

const useStyles = makeStyles(theme => ({
  bottomSheet: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    position: 'absolute',
    left: 0,
    width: screenWidth,
    height: bottomSheetHeight
  },
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: theme.colors.black
  },
  handle: {
    height: 6,
    width: 140,
    opacity: 0.3,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor: theme.colors.black
  }
}))

function BottomSheet({ children, onClose }: PropsWithChildren<Props>): React.JSX.Element {
  const [expanded, setExpanded] = useState(false)
  const styles = useStyles()
  const { current: opacity } = useRef(new Animated.Value(0))
  const { current: translateY } = useRef(new Animated.Value(screenHeight))

  const close = useCallback(() => {
    translateY.flattenOffset()
    const a1 = Animated.spring(translateY, {
      toValue: screenHeight,
      restSpeedThreshold: 100,
      restDisplacementThreshold: 100,
      useNativeDriver: true
    })
    const a2 = Animated.timing(opacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    })

    const animations = Animated.parallel([a1, a2])

    animations.start(() => {
      setExpanded(false)
      onClose()
    })
  }, [onClose, opacity, translateY])

  const open = useCallback(() => {
    translateY.flattenOffset()
    setExpanded(true)
    const a1 = Animated.timing(translateY, {
      toValue: screenHeight - bottomSheetHeight,
      useNativeDriver: true
    })
    const a2 = Animated.timing(opacity, {
      toValue: 0.9,
      duration: 100,
      useNativeDriver: true
    })

    const animations = Animated.parallel([a1, a2])
    animations.start()
  }, [opacity, translateY])

  useEffect(() => {
    open()
  }, [open])
  const { current: panResponder } = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateY.extractOffset()
      },

      onPanResponderMove: (_event, gesture) => {
        if (gesture.dy > 0) {
          return Animated.event([null, { dy: translateY }], {
            useNativeDriver: false
          })(_event, gesture)
        }

        return false
      },

      onPanResponderRelease: (_event, gesture) => {
        if (gesture.dy < bottomSheetDragThresh) {
          open()
        } else {
          close()
        }
      }
    })
  )

  return (
    <>
      {expanded && <Animated.View style={[styles.overlay, { opacity }]} />}
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [{ translateY }],
            paddingBottom: 24
          }
        ]}>
        <View pt16 pb24 {...panResponder.panHandlers}>
          <View style={styles.handle} />
        </View>
        <ScrollView ph24>{children}</ScrollView>
      </Animated.View>
    </>
  )
}

export default BottomSheet
