import { Image } from '@rneui/themed'
import { useState } from 'react'
import { FlatList } from 'react-native'

import { useLightBoxContext } from '../contexts/lightBoxContext'
import View from './View'

type Data = {
  source: string
  thumbnail?: string
  index: number
}

type Props = {
  data: Data[]
  col: number
  noScroll?: Boolean
}

function LightBoxContainer(props: Props) {
  const { data, noScroll, col } = props
  const { open: openLightBox } = useLightBoxContext()
  const [containerWidth, setContainerWidth] = useState(0)
  const imageWidth = (containerWidth - col * 4) / col

  const onLayout = (event: { nativeEvent: { layout: { width: any } } }) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const renderItem = ({ item }: { item: Data }) => (
    <Image
      source={{ uri: item.thumbnail ? item.thumbnail : item.source }}
      style={{ width: imageWidth, height: imageWidth, margin: 2 }}
      resizeMode="center"
      onPress={() => {
        openLightBox(data, item.index)
      }}
    />
  )

  return (
    <View onLayout={onLayout}>
      <FlatList
        data={data}
        numColumns={col}
        renderItem={renderItem}
        scrollEnabled={!noScroll}
        keyExtractor={item => item.index as unknown as string}
      />
    </View>
  )
}

export default LightBoxContainer
