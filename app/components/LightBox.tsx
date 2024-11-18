import { Image, makeStyles } from '@rneui/themed'
import { useCallback, useEffect } from 'react'
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

type Data = {
  source: string
  index: number
}

type Props = {
  onClose: () => void
  data: Data[]
  index: number
}

const useStyles = makeStyles(theme => ({
  overlay: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: theme.colors.black
  }
}))

function LightBox(props: Props): React.JSX.Element {
  const { onClose, data, index } = props
  const styles = useStyles()
  const scale = useSharedValue(0)
  const startScale = useSharedValue(0)
  const imageWidth = useSharedValue(0)
  const imageHeight = useSharedValue(0)
  const translationY = useSharedValue(0)
  const translationX = useSharedValue(0)
  const prevTranslationY = useSharedValue(0)
  const prevTranslationX = useSharedValue(0)
  const scrollEnabled = useSharedValue(true)
  const animatedImageStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }, { translateY: translationY.value }, { scale: scale.value }]
  }))

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth)
      loadImageDimensions(index)
    }

  const loadImageDimensions = (index: number) => {
    const currentImageUri = data?.[index]?.source
    if (currentImageUri) {
      Image.getSize(currentImageUri, (width, height) => {
        const scaleFactor = Math.min(screenWidth / width, screenHeight / height)
        imageWidth.value = width * scaleFactor
        imageHeight.value = height * scaleFactor
      })
    }
  }

  const open = useCallback(() => {
    loadImageDimensions(index)
    scale.value = withTiming(1)
  }, [index, scale])
  const close = useCallback(() => {
    onClose()
  }, [onClose])
  useEffect(() => {
    open()
  }, [open])

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value <= 3 && scale.value !== 1) {
        scale.value = withTiming(1)
        translationX.value = withTiming(1)
        translationY.value = withTiming(1)
        scrollEnabled.value = true
      }
      if (scale.value === 1) {
        scale.value = withTiming(3)
        scrollEnabled.value = false
      }
    })
    .runOnJS(true)

  const pan = Gesture.Pan()
    .minDistance(10)
    .onStart(() => {
      prevTranslationY.value = translationY.value
      prevTranslationX.value = translationX.value
    })
    .onUpdate(event => {
      if (scale.value > 1) {
        const maxTranslateX = (screenWidth * scale.value) / 2
        const maxTranslateY = (screenHeight * scale.value) / 2
        translationY.value = clamp(prevTranslationY.value + event.translationY, -maxTranslateY, maxTranslateY)
        translationX.value = clamp(prevTranslationX.value + event.translationX, -maxTranslateX, maxTranslateX)
      } else {
        const maxTranslateY = (screenHeight * scale.value) / 2
        translationY.value = clamp(prevTranslationY.value + event.translationY, -maxTranslateY, maxTranslateY)
      }
    })
    .onEnd(() => {
      const screenEdgeX = (imageWidth.value * scale.value - screenWidth) / 2
      const screenEdgeY = (imageHeight.value * scale.value - screenHeight) / 2
      if (
        (translationY.value > screenHeight * 0.2 && scale.value === 1) ||
        (translationY.value < -(screenHeight * 0.2) && scale.value === 1)
      ) {
        close()
      }
      if (scale.value > 1 && translationX.value > screenEdgeX) {
        translationX.value = withTiming(screenEdgeX)
      }
      if (scale.value > 1 && translationX.value < -screenEdgeX) {
        translationX.value = withTiming(-screenEdgeX)
      }
      if (scale.value > 1 && translationY.value > screenEdgeY) {
        translationY.value = withTiming(screenEdgeY)
      }
      if (scale.value > 1 && translationY.value < -screenEdgeY) {
        translationY.value = withTiming(-screenEdgeY)
      }
      if (scale.value === 1) {
        translationY.value = withTiming(0)
      }
      if (screenHeight > imageHeight.value * scale.value) {
        translationY.value = withTiming(0)
      }
      if (screenWidth > imageWidth.value * scale.value) {
        translationX.value = withTiming(0)
      }
    })
    .runOnJS(true)

  const pinch = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value
    })
    .onUpdate(event => {
      scale.value = clamp(startScale.value * event.scale, 0.5, Math.min(screenWidth / 100, screenHeight / 100))
    })
    .onEnd(() => {
      if (scale.value < 1) {
        translationX.value = withTiming(1)
        translationY.value = withTiming(1)
        scale.value = withTiming(1)
        scrollEnabled.value = true
      }
      if (scale.value > 3) {
        scale.value = withTiming(3)
      }
      if (scale.value > 1) {
        scrollEnabled.value = false
      }
    })
    .runOnJS(true)

  const combinedGesture = Gesture.Simultaneous(tap, pan, pinch)

  const renderItem = useCallback(
    ({ item }: { item: Data }) => (
      <Image
        source={{ uri: item.source }}
        style={{ width: screenWidth, height: screenHeight }}
        resizeMode="contain"
      />
  ), [])


  return (
    <>
      <GestureDetector gesture={combinedGesture}>
        <View style={styles.overlay}>
          <Animated.FlatList
            windowSize={1}
            style={animatedImageStyles}
            horizontal
            data={data}
            renderItem={renderItem}
            getItemLayout={(Itemdata, itemIndex) => ({
              length: screenWidth,
              offset: screenWidth * itemIndex,
              index
            })}
            keyExtractor={(item, itemIndex) => itemIndex.toString()}
            initialScrollIndex={index}
            scrollEnabled={scrollEnabled}
            onMomentumScrollEnd={event => {onMomentumScrollEnd(event)}}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </GestureDetector>
    </>
  )
}

export default LightBox
