import { Text, makeStyles } from '@rneui/themed'

import PageWrapper from '../components/PageWrapper'
import View from '../components/View'

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
})

function AboutPage(): React.JSX.Element {
  const styles = useStyles()

  return (
    <PageWrapper>
      <View style={styles.parentContainer}>
        <Text>This is the about page</Text>
      </View>
    </PageWrapper>
  )
}

export default AboutPage
