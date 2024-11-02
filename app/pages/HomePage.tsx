import { IconProp } from '@fortawesome/fontawesome-svg-core'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Colors, Divider } from '@rneui/themed'
import { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'

import AlertBox from '../components/AlertBox'
import BoxListItem from '../components/BoxListItem'
import LoadingState from '../components/LoadingState'
import PageWrapper from '../components/PageWrapper'
import SectionTitle from '../components/SectionTitle'
import View from '../components/View'
import type { HomeRouterParamList } from '../router/_routes'

type Props = NativeStackScreenProps<HomeRouterParamList, 'Home'>

interface Data {
  id: string
  title: string
  subtitle: string
  imageSrc?: string
  onPress?: () => undefined
  icon?: IconProp
  iconColor?: keyof Omit<Colors, 'platform'>
}

function HomePage({ navigation }: Props): React.JSX.Element {
  const goToSubstituteRequests = () => navigation.navigate('SubstituteRequests')
  const [refreshing, setRefreshing] = useState(false)

  // const { isPending, data, refetch } = useQuery({
  //   queryKey: ['listMySubstituteRequestsRecipients'],
  //   queryFn: () => Account.listMySubstituteRequestsRecipients()
  // })

  // TODO Some error message could be displayed to the user in a modal -> .catch
  // const onRefresh = useCallback(() => {
  //   setRefreshing(true)
  //   refetch()
  //     .then(() => setRefreshing(false))
  //     .catch(error => console.log(error))
  //     .finally(() => setRefreshing(false))
  // }, [refetch])

  const data: Data[] = [
    { id: '1', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'green' },
    { id: '2', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
    { id: '3', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
    { id: '4', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'yellow' },
    { id: '5', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'primary' },
    { id: '6', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'green' },
    { id: '7', title: 'Test content box', subtitle: 'content box', imageSrc: 'https://picsum.photos/200', icon: ['fas', 'info-circle'], iconColor: 'yellow' }
  ]

  return (
    <PageWrapper>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} /* onRefresh={onRefresh} */ />}>
        <View ph24>
          <View mt24 mb32></View>
          <AlertBox
            title="Demo Mobile Version 0.1"
            message={"Read what it's all about"}
            icon={['fas', 'info-circle']}
            mb32
          />
        </View>
        <Divider mb32 />
        <View ph24 mb24>
          {data && data.length > 0 ? (
            <SectionTitle title="Requests" link="View all" onPress={goToSubstituteRequests} />
          ) : (
            <SectionTitle title="Requests" />
          )}
          {data == null /* || isPending */ ? (
            <LoadingState />
          ) : (
            data.slice(0, 3).map(substituteRequestRecipient => (
              <BoxListItem
                key={substituteRequestRecipient.id}
                title={substituteRequestRecipient.title ?? ''}
                subtitle={substituteRequestRecipient.subtitle ?? ''}
                imageSrc={substituteRequestRecipient.imageSrc ?? undefined}
                icon={substituteRequestRecipient.icon ?? undefined}
                iconColor={substituteRequestRecipient.iconColor ?? undefined}
                mb16
                onPress={() => {
                  /* navigation.navigate('SubstituteRequest', {
                    slug: substituteRequestRecipient.slug,
                  }); */
                }}
              />
            ))
          )}
        </View>
        <View ph24>
          <SectionTitle title="Applications" />
          <AlertBox message="Not yet !" color="gray400" title="test" />
        </View>
      </ScrollView>
    </PageWrapper>
  )
}

export default HomePage
