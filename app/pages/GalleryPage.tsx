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
              { source: 'https://picsum.photos/500/300', index: 0 },
              { source: 'https://picsum.photos/600/300', index: 1 },
              { source: 'https://picsum.photos/700/300', index: 2 },
              { source: 'https://picsum.photos/800/300', index: 3 },
              { source: 'https://picsum.photos/900/300', index: 4 },
              { source: 'https://picsum.photos/500/400', index: 5 },
              { source: 'https://picsum.photos/500/500', index: 6 },
              { source: 'https://picsum.photos/500/600', index: 7 },
              { source: 'https://picsum.photos/500/700', index: 8 },
              { source: 'https://picsum.photos/500/800', index: 9 },
              { source: 'https://picsum.photos/500/900', index: 10 },
              { source: 'https://picsum.photos/500/1000', index: 11 },
              { source: 'https://picsum.photos/500/300', index: 12 },
              { source: 'https://picsum.photos/500/300', index: 13 },
              { source: 'https://picsum.photos/500/300', index: 14 },
              { source: 'https://picsum.photos/500/300', index: 15 },
              { source: 'https://picsum.photos/500/300', index: 16 },
              { source: 'https://picsum.photos/500/300', index: 17 },
              { source: 'https://picsum.photos/500/300', index: 18 },
              { source: 'https://picsum.photos/500/300', index: 19 },
              { source: 'https://picsum.photos/500/300', index: 20 },
              { source: 'https://picsum.photos/500/300', index: 21 },
              { source: 'https://picsum.photos/500/300', index: 22 },
              { source: 'https://picsum.photos/500/300', index: 23 },
              { source: 'https://picsum.photos/500/300', index: 24 },
              { source: 'https://picsum.photos/500/300', index: 25 },
              { source: 'https://picsum.photos/500/300', index: 26 }
            ]}
          />
        </View>
      </View>
    </PageWrapper>
  )
}

export default NotificationsPage
