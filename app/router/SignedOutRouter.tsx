import type { StackCardStyleInterpolator } from '@react-navigation/stack'
import { createStackNavigator } from '@react-navigation/stack'
import { makeStyles } from '@rneui/themed'
import { Animated, ImageBackground } from 'react-native'

import backgroundImage from '../assets/background.jpg'
import SignInPage from '../pages/public/SignInPage'
import StartPage from '../pages/public/StartPage'
import type { SignedOutRouterParamList } from './_routes'

const Stack = createStackNavigator<SignedOutRouterParamList>()

const useStyles = makeStyles({
  background: {
    flex: 1
  }
})

const forSlide: StackCardStyleInterpolator = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp'
        })
      : 0
  )

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width,
                0,
                screen.width * -1 // change the coefficient here
              ],
              extrapolate: 'clamp'
            }),
            inverted
          )
        }
      ]
    }
  }
}

function SignedOutRouter(): React.JSX.Element {
  const styles = useStyles()

  return (
    <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.background}>
      <Stack.Navigator
        initialRouteName="StartPage"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
          cardStyleInterpolator: forSlide
        }}>
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="SignInPage" component={SignInPage} />
      </Stack.Navigator>
    </ImageBackground>
  )
}

export default SignedOutRouter
