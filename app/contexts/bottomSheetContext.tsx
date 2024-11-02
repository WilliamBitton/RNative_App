import { Divider } from '@rneui/themed'
import type { PropsWithChildren } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import BottomSheet from '../components/BottomSheet'
import ButtonElement from '../components/ButtonElement'

type DividerAction = {
  index: number
  divider: true
}

type LinkAction = Omit<Parameters<typeof ButtonElement>[0], 'link'> & { title: string }

type Actions = (DividerAction | LinkAction)[]

interface IBottomSheetContext {
  open: (target: React.JSX.Element | Actions) => void
  close: () => void
}

const BottomSheetContext = createContext<IBottomSheetContext>({
  open: () => undefined,
  close: () => undefined
})

const styles = {
  divider: {
    marginVertical: 21
  }
}

export const useBottomSheetContext = (): IBottomSheetContext => useContext(BottomSheetContext)

export function BottomSheetProvider({ children }: PropsWithChildren): React.JSX.Element {
  const [openedChildren, setOpenedChildren] = useState<React.JSX.Element | null>(null)

  const open = useCallback((target: React.JSX.Element | Actions) => {
    if (Array.isArray(target)) {
      setOpenedChildren(
        <>
          {target.map(line => {
            if ('divider' in line) {
              return <Divider key={`divider${line.index}`} style={styles.divider} />
            }

            return <ButtonElement key={line.title} link {...line} />
          })}
        </>
      )

      return
    }

    setOpenedChildren(target)
  }, [])

  const close = useCallback(() => {
    setOpenedChildren(null)
  }, [])

  const value = useMemo(
    () => ({
      open,
      close
    }),
    [close, open]
  )

  return (
    <BottomSheetContext.Provider value={value}>
      {children}
      {openedChildren && <BottomSheet onClose={close}>{openedChildren}</BottomSheet>}
    </BottomSheetContext.Provider>
  )
}
