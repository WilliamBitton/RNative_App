import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import LightBox from '../components/LightBox'

type Data = {
  source: string
  index: number
}

interface ILightBoxContext {
  open: (data: Data[], index: number) => void
  close: () => void
}

const LightBoxContext = createContext<ILightBoxContext>({
  open: () => undefined,
  close: () => undefined
})

export const useLightBoxContext = (): ILightBoxContext => useContext(LightBoxContext)

export function LightBoxProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [openedChildren, setOpenedChildren] = useState(false)
  const [imagesData, setImagesData] = useState<Data[]>([{ source: '', index: 0 }])
  const [imageIndex, setImageIndex] = useState<number>(0)

  const open = useCallback((data: Data[], index: number) => {
    setImagesData(data)
    setImageIndex(index)
    setOpenedChildren(true)
  }, [])

  const close = useCallback(() => {
    setOpenedChildren(false)
  }, [])

  const value = useMemo(
    () => ({
      open,
      close
    }),
    [close, open]
  )

  return (
    <LightBoxContext.Provider value={value}>
      {children}
      {openedChildren && <LightBox onClose={close} data={imagesData} index={imageIndex} />}
    </LightBoxContext.Provider>
  )
}
