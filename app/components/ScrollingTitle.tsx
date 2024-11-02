import type { Colors } from '@rneui/themed'
import { Text } from '@rneui/themed'
import { type PropsWithChildren, useEffect } from 'react'

import { useScrollingTitleContext } from '../contexts/scrollingTitleContext'

type Props = {
  title: string
  color?: keyof Omit<Colors, 'platform'>
}

function ScrollingTitle({ title, color }: PropsWithChildren<Props>) {
  const { setPosition } = useScrollingTitleContext()

  useEffect(
    () => () => {
      setPosition({
        start: 0,
        end: 0
      })
    },
    [setPosition]
  )

  function handleh1Position(event: { nativeEvent: { layout: { y: number; height: number } } }) {
    setPosition({
      start: event.nativeEvent.layout.y,
      end: event.nativeEvent.layout.y + event.nativeEvent.layout.height
    })
  }

  return (
    <Text h1 color={color} onLayout={event => handleh1Position(event)}>
      {title}
    </Text>
  )
}

export default ScrollingTitle
