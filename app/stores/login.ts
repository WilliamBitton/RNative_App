import { create } from 'zustand'

import type Account from '../models/account'

type LoginStore = {
  authToken: string | null
  authIat: number | null
  loggedInAccount: Account | null
  isLoading: boolean
  setAccount: (account: Account) => unknown
}

const useLoginStore = create<LoginStore>(set => ({
  authToken: null,
  authIat: null,
  loggedInAccount: null,
  isLoading: false,
  setAccount: loggedInAccount => set({ loggedInAccount })
}))

export default useLoginStore
