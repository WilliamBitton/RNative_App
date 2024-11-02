import { Text, makeStyles } from '@rneui/themed'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'

import ButtonElement from '../../../components/ButtonElement'
import PageWrapper from '../../../components/PageWrapper'
import View from '../../../components/View'
import Account from '../../../models/account'
import Email from './Email'
import Password from './Password'
import { type Inputs } from './_types'

const useStyles = makeStyles({
  keyboard: {
    flex: 1
  }
})

function SignInPage(): React.JSX.Element {
  const styles = useStyles()
  const moveToSignUpPage = () => {}
  const [loginFailed, setLoginFailed] = useState(false)
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit(data => {
    Account.signIn({ token: 'token', iat: 101010 })?.catch(() => {
      setLoginFailed(true)
    })
  })

  return (
    <PageWrapper withBackButton transparent light inset>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboard}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              marginTop: 'auto'
            }}
            ph24
            pb32>
            <Text h1 color="white" mb24>
              {'Login'}
            </Text>
            <Email control={control} />
            <Password control={control} loginFailed={loginFailed} setLoginFailed={setLoginFailed} />
            <ButtonElement
              title="Login"
              onPress={() => {
                onSubmit().catch(error => console.log(error))
              }}
              color="primary"
              style={{ width: '100%' }}
              mb24
            />
            <Text style={{ textAlign: 'center' }} color="black">
              {'New to Muvac ?'}{' '}
              <Text color="black" style={{ textDecorationLine: 'underline' }} onPress={moveToSignUpPage}>
                {'Create account'}
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </PageWrapper>
  )
}

export default SignInPage
