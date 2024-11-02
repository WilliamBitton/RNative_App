import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Colors, Text, makeStyles } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import BoxListItem from '../components/BoxListItem'
import PageWrapper from '../components/PageWrapper'
import SectionHeader from '../components/SectionHeader'
import View from '../components/View'

const useStyles = makeStyles({
  h1: {
    paddingHorizontal: 24
  },
  container: {
    height: '100%',
    backgroundColor: 'white'
  },
  sectionHeader: {
    marginVertical: 20,
    marginHorizontal: 24
  },
  flatList: {
    paddingHorizontal: 24
  }
})

interface Data {
  id: number
  title: string
  subtitle: string
  imageSrc?: string
  onPress?: () => undefined
  icon?: IconProp
  iconColor?: keyof Omit<Colors, 'platform'>
}

const data: Data[] = [
  { id: 1, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'green' },
  { id: 2, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
  { id: 3, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
  { id: 4, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'yellow' },
  { id: 5, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
  { id: 6, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'green' },
  { id: 7, title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'yellow' }
]

function SubstituteRequestsPage(): React.JSX.Element {
  const styles = useStyles()
  const [formattedData, setformattedData] = useState<Data[]>()

  useEffect(() => {
    if (data) {
      const transformedData: Data[] = data.map(substituteRequestRecipient => ({
        id: substituteRequestRecipient.id,
        title: substituteRequestRecipient.title ?? '',
        subtitle: substituteRequestRecipient.subtitle ?? '',
        imageSrc: substituteRequestRecipient.imageSrc ?? undefined,
        icon: substituteRequestRecipient.icon ?? undefined,
        iconColor: substituteRequestRecipient.iconColor ?? undefined
      }))
      setformattedData(transformedData)
    }
  }, [data])

  const renderItem = ({ item }: { item: Data }) => (
    <BoxListItem
      title={item.title}
      subtitle={item.subtitle}
      onPress={item.onPress ? item.onPress : () => undefined}
      imageSrc={item.imageSrc}
      icon={item.icon ? item.icon : undefined}
      iconColor={item.iconColor ? item.iconColor : undefined}
      mb16
    />
  )

  return (
    <PageWrapper withBackButton>
      <Text h1 style={styles.h1} mb16>
        Substitute Requests
      </Text>
      {/* <TopTabRouter /> */}
      <View style={styles.container}>
        <SectionHeader title="Gewandhaus" style={styles.sectionHeader} />
        <FlatList
          data={formattedData}
          renderItem={renderItem}
          keyExtractor={item => item.id as unknown as string}
          contentContainerStyle={styles.flatList}
        />
      </View>
    </PageWrapper>
  )
}

export default SubstituteRequestsPage
