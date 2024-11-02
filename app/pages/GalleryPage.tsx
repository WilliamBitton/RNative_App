import { makeStyles } from '@rneui/themed'

import LightBoxContainer from '../components/LightBoxContainer'
import PageWrapper from '../components/PageWrapper'
import ScrollingTitle from '../components/ScrollingTitle'
import View from '../components/View'

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    height: '100%'
  }
})

function NotificationsPage(): React.JSX.Element {
  const styles = useStyles()

  return (
    <PageWrapper scrollingTitle title={'Gallery'}>
      <View style={styles.parentContainer} ph24>
        <ScrollingTitle title={'Gallery'} />
        <View mt8>
          <LightBoxContainer
            noScroll
            col={3}
            data={[
              { source: 'https://picsum.photos/1500/1500', index: 0 },
              { source: 'https://picsum.photos/1500/1500', index: 1 },
              { source: 'https://picsum.photos/1500/1500', index: 2 },
              { source: 'https://picsum.photos/1500/1500', index: 3 },
              { source: 'https://picsum.photos/1500/1500', index: 4 },
              { source: 'https://picsum.photos/1500/1500', index: 5 },
              { source: 'https://picsum.photos/1500/1500', index: 6 },
              { source: 'https://picsum.photos/1500/1500', index: 7 },
              { source: 'https://picsum.photos/1500/1500', index: 8 },
              { source: 'https://picsum.photos/1500/1500', index: 9 },
              { source: 'https://picsum.photos/1500/1500', index: 10 },
              { source: 'https://picsum.photos/1500/1500', index: 11 },
              { source: 'https://picsum.photos/1500/1500', index: 12 },
              { source: 'https://picsum.photos/1500/1500', index: 13 },
              { source: 'https://picsum.photos/1500/1500', index: 14 },
              { source: 'https://picsum.photos/1500/1500', index: 15 },
              { source: 'https://picsum.photos/1500/1500', index: 16 },
              { source: 'https://picsum.photos/1500/1500', index: 17 },
              { source: 'https://picsum.photos/1500/1500', index: 18 },
              { source: 'https://picsum.photos/1500/1500', index: 19 },
              { source: 'https://picsum.photos/1500/1500', index: 20 },
              { source: 'https://picsum.photos/1500/1500', index: 21 },
              { source: 'https://picsum.photos/1500/1500', index: 22 },
              { source: 'https://picsum.photos/1500/1500', index: 23 },
              { source: 'https://picsum.photos/1500/1500', index: 24 },
              { source: 'https://picsum.photos/1500/1500', index: 25 },
              { source: 'https://picsum.photos/1500/1500', index: 26 }
            ]}
          />
        </View>
      </View>
    </PageWrapper>
  )
}

export default NotificationsPage
