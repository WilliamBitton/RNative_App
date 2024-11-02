import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

import useLoginStore from '../stores/login'

class Account {
  id: number
  email: string
  firstName: string
  lastName: string
  fullName: string
  completedAt: number
  createdAt: number
  admin: boolean
  use12h: boolean

  constructor(account: Record<string, unknown>) {
    if (
      typeof account.firstName !== 'string' ||
      typeof account.fullName !== 'string' ||
      typeof account.email !== 'string' ||
      typeof account.lastName !== 'string' ||
      typeof account.id !== 'number' ||
      typeof account.completedAt !== 'number' ||
      typeof account.createdAt !== 'number' ||
      !account.completedAt ||
      !account.createdAt
    ) {
      throw new Error()
    }

    this.id = account.id
    this.use12h = !!account.use12h
    this.email = account.email
    this.firstName = account.firstName
    this.lastName = account.lastName
    this.fullName = account.fullName
    this.completedAt = account.completedAt
    this.createdAt = account.createdAt
    this.admin = typeof account.admin === 'boolean' || typeof account.admin === 'number' ? !!account.admin : false
  }

  async signOut() {
    await Promise.all([
      Keychain.resetGenericPassword(),
      AsyncStorage.removeItem('FCMToken'),
      AsyncStorage.removeItem('iat')
    ])
    useLoginStore.setState({
      authIat: null,
      authToken: null,
      loggedInAccount: null
    })
  }

  static async signIn(payload?: { token: string; iat: number }) {
    let { token, iat } = payload ?? { token: '', iat: 0 }

    if (token === '') {
      const storedIat = await AsyncStorage.getItem('iat')
      const credentials = await Keychain.getGenericPassword()
      if (credentials && storedIat) {
        token = credentials.password
        iat = parseInt(storedIat, 10)
      }
    }

    if (token) {
      const signedAccount = {
        id: 1,
        email: 'johnsmith@noemail.com',
        firstName: 'John',
        lastName: 'Smith',
        fullName: 'John Smith',
        completedAt: 20241024,
        createdAt: 20241024,
        admin: true,
        use12h: false,
        async signOut() {
          await Promise.all([
            Keychain.resetGenericPassword(),
            AsyncStorage.removeItem('FCMToken'),
            AsyncStorage.removeItem('iat')
          ])
          useLoginStore.setState({
            authIat: null,
            authToken: null,
            loggedInAccount: null
          })
        }
      }
      await Promise.all([Keychain.setGenericPassword('Demo', token), AsyncStorage.setItem('iat', iat.toString())])
      useLoginStore.setState({ loggedInAccount: signedAccount, authToken: token, authIat: iat, isLoading: false })
    } else {
      useLoginStore.setState({ isLoading: false })
    }
  }

  static async completeSignIn() {
    const account = {
      id: 1,
      email: 'johnsmith@noemail.com',
      firstName: 'John',
      lastName: 'Smith',
      fullName: 'John Smith',
      completedAt: 20241024,
      createdAt: 20241024,
      admin: true,
      use12h: false,
      authToken: 1000,
      async signOut() {
        await Promise.all([
          Keychain.resetGenericPassword(),
          AsyncStorage.removeItem('FCMToken'),
          AsyncStorage.removeItem('iat')
        ])
        useLoginStore.setState({
          authIat: null,
          authToken: null,
          loggedInAccount: null
        })
      }
    }
    return account
  }
}

export default Account
