import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

type Position = {
  start: number
  end: number
}

interface IScrollingTitleContext {
  position: Position
  setPosition: Dispatch<SetStateAction<Position>>
}

const ScrollingTitleContext = createContext<IScrollingTitleContext>({
  position: { start: 0, end: 0 },
  setPosition: () => undefined
})

export const useScrollingTitleContext = (): IScrollingTitleContext => useContext(ScrollingTitleContext)

export function ScrollingTitleProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [position, setPosition] = useState<Position>({
    start: 0,
    end: 0
  })

  const value = useMemo(
    () => ({
      position,
      setPosition
    }),
    [position]
  )

  return <ScrollingTitleContext.Provider value={value}>{children}</ScrollingTitleContext.Provider>
}
