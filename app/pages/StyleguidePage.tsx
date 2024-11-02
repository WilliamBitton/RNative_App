/* eslint-disable react-native/no-inline-styles */
import type { CompositeScreenProps } from '@react-navigation/native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import type { StackScreenProps } from '@react-navigation/stack'
import { Divider, Text, makeStyles } from '@rneui/themed'
import { Controller, useForm } from 'react-hook-form'

import AlertBox from '../components/AlertBox'
import ButtonElement from '../components/ButtonElement'
import ComboElement from '../components/ComboElement'
import DatePickerElement from '../components/DatePickerElement'
import InputField from '../components/InputField'
import ListItemElement from '../components/ListItemElement'
import MediaBox from '../components/MediaBox'
import PageWrapper from '../components/PageWrapper'
import RadioGroup from '../components/RadioGroup'
import ScrollingTitle from '../components/ScrollingTitle'
import SelectElement from '../components/SelectElement'
import SwitchElement from '../components/SwitchElement'
import View from '../components/View'
import { useBottomSheetContext } from '../contexts/bottomSheetContext'
import type { MainRouterParamList, SettingsRouterParamList } from '../router/_routes'

type Props = CompositeScreenProps<
  NativeStackScreenProps<SettingsRouterParamList, 'Styleguide'>,
  StackScreenProps<MainRouterParamList>
>

type SelectData = {
  label: string
  value: string
}

type Inputs = {
  input1: string
  input2: string
  password: string
  switch1: boolean
  switch2: boolean
  switch3: boolean
  switch4: boolean
  radio1: string
  radio2: string
  date: Date
  select: SelectData
  textarea: string
  combo: boolean
}

function BottomSheet(): React.JSX.Element {
  return (
    <>
      <Text h1 mb16>
        Bottom sheet
      </Text>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis. Eu consequat ac felis donec et. Amet
        tellus cras adipiscing enim eu. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Nulla facilisi etiam
        dignissim diam quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adipiscing elit
        pellentesque. Mattis enim ut tellus elementum sagittis vitae et leo duis. Et molestie ac feugiat sed lectus
        vestibulum mattis ullamcorper. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Nunc scelerisque
        viverra mauris in aliquam sem fringilla ut. Sed egestas egestas fringilla phasellus. Sem nulla pharetra diam sit
        amet. Ornare arcu odio ut sem. Elit at imperdiet dui accumsan sit amet nulla facilisi. Nisl tincidunt eget
        nullam non nisi est. Gravida in fermentum et sollicitudin. Vitae suscipit tellus mauris a diam. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Aliquet bibendum enim facilisis gravida neque convallis. Eu consequat ac felis donec et. Amet tellus cras
        adipiscing enim eu. Nulla facilisi cras fermentum odio eu feugiat pretium nibh. Nulla facilisi etiam dignissim
        diam quis enim lobortis scelerisque fermentum. Dolor sit amet consectetur adipiscing elit pellentesque. Mattis
        enim ut tellus elementum sagittis vitae et leo duis. Et molestie ac feugiat sed lectus vestibulum mattis
        ullamcorper. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Nunc scelerisque viverra mauris in
        aliquam sem fringilla ut. Sed egestas egestas fringilla phasellus. Sem nulla pharetra diam sit amet. Ornare arcu
        odio ut sem. Elit at imperdiet dui accumsan sit amet nulla facilisi. Nisl tincidunt eget nullam non nisi est.
        Gravida in fermentum et sollicitudin. Vitae suscipit tellus mauris a diam.
      </Text>
    </>
  )
}

const useStyles = makeStyles({
  parentContainer: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 24
  },
  header: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'black'
  },
  alertBoxWhite: {
    borderWidth: 0.5
  }
})

function StyleguidePage({ navigation }: Props): React.JSX.Element {
  const styles = useStyles()
  const {
    control,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      input1: '',
      input2: '',
      password: '',
      switch1: false,
      switch2: false,
      switch3: true,
      switch4: true,
      radio1: 'checked',
      radio2: 'checked',
      date: new Date(),
      select: { label: 'Piano', value: 'Piano' },
      textarea: '',
      combo: false
    }
  })
  const { open: openBottomSheet } = useBottomSheetContext()

  return (
    <PageWrapper withBackButton title="Styleguide" withRightButton="Save" scrollingTitle>
      <View style={styles.parentContainer} pb32>
        <View style={styles.header} mb24>
          <Text color="gray400" mb8>
            ADMIN PAGE
          </Text>
          <ScrollingTitle color="white" title="Styleguide" />
          <Text color="gray400" mt8>
            Just a collection of UI components that are used in the application
          </Text>
        </View>
        <Text h2 mb16>
          Typography
        </Text>
        <Text h1 mb8>
          Headline h1
        </Text>
        <Text h2 mb8>
          Headline h2
        </Text>
        <Text h3 mb8>
          Headline h3
        </Text>
        <Text>
          Running text. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget
          metus. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Maecenas sed diam eget risus varius
          blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Nullam id dolor id nibh
          ultricies vehicula ut id elit.
        </Text>

        <Divider mv24 />

        <Text h2 mb16>
          Forms
        </Text>
        <InputField
          linkTitle="Optional action"
          onLinkPress={() => {}}
          errorMessage=""
          label="Value"
          placeholder="Value"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur } }): React.JSX.Element => (
            <InputField
              linkTitle="Forgot your password?"
              onLinkPress={() => {}}
              errorMessage={errors.password && 'Cannot exceed 100 character'}
              label="Password"
              placeholder=""
              password
              onBlur={onBlur}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <SelectElement
              value={value}
              onChange={onChange}
              label="Select"
              mb24
              errorMessage={errors.select && 'Error'}
              data={[
                { label: 'Piano', value: 'Piano' },
                { label: 'Violoncello', value: 'Violoncello' },
                { label: 'Violin', value: 'Violin' },
                { label: 'Violin', value: 'Violin2' },
                { label: 'Violin', value: 'Violin3' },
                { label: 'Violin', value: 'Violin4' },
                { label: 'Violin', value: 'Violin5' },
                { label: 'Violin', value: 'Violin6' },
                { label: 'Violin', value: 'Violin7' }
              ]}
            />
          )}
          name="select"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { value, onChange } }): React.JSX.Element => (
            <DatePickerElement
              value={value}
              onChange={onChange}
              errorMessage={errors.date && 'This field cannot be empty'}
              mb24
              backgroundColor="gray200"
              textColor="gray600"
            />
          )}
          name="date"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }): React.JSX.Element => (
            <InputField
              errorMessage={errors.input1 && 'This is required'}
              label="Input with button"
              placeholder="Value"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              icon={['fas', 'random']}
            />
          )}
          name="input1"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }): React.JSX.Element => (
            <InputField
              reset
              errorMessage={errors.input2 && 'This is required'}
              label="Input with reset button"
              placeholder="Value"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="input2"
        />
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 200
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <InputField
              mb32
              long
              label="Textarea"
              rows={4}
              value={value}
              errorMessage={errors.textarea && 'Cannot exceed 200'}
              onChangeText={onChange}
            />
          )}
          name="textarea"
        />

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <ComboElement value={value} onChange={onChange} color="primary" />
          )}
          name="combo"
        />

        <Divider mv24 />

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <SwitchElement onValueChange={onChange} value={value} label="Switch unchecked" mv8 />
          )}
          name="switch1"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <SwitchElement onValueChange={onChange} value={value} disabled label="Switch unchecked disabled" mv8 />
          )}
          name="switch2"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <SwitchElement onValueChange={onChange} value={value} label="Switch checked" mv8 />
          )}
          name="switch3"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <SwitchElement onValueChange={onChange} value={value} disabled label="Switch checked disabled" mv8 />
          )}
          name="switch4"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <RadioGroup
              mv8
              radioList={[
                { label: 'Radio unchecked', value: 'unchecked' },
                { label: 'Radio checked', value: 'checked' }
              ]}
              value={value}
              onValueChange={onChange}
            />
          )}
          name="radio1"
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, value } }): React.JSX.Element => (
            <RadioGroup
              mv8
              radioList={[
                {
                  label: 'Radio unchecked disabled',
                  disabled: true,
                  value: 'unchecked'
                },
                {
                  label: 'Radio checked disabled',
                  disabled: true,
                  value: 'checked'
                }
              ]}
              value={value}
              onValueChange={onChange}
            />
          )}
          name="radio2"
        />

        <Divider mv24 />

        <Text h2 mb16>
          Other components
        </Text>
        <MediaBox buttonText="Download document" mb16 />
        <AlertBox
          title="AlertBoxWithIconTitle with an extremely long title"
          message="This is an alertBox with an extremely long subtitle that spans over multiple lines"
          icon={['fas', 'info-circle']}
          mb16
        />
        <AlertBox title="AlertBox" message="This is an alertBox" mb16 />
        <AlertBox
          title="AlertBoxWithIconTitle"
          message="This is an alertBox"
          icon={['fas', 'info-circle']}
          style={styles.alertBoxWhite}
          color="white"
          mb16
        />
        <AlertBox title="AlertBox" message="This is an alertBox" style={styles.alertBoxWhite} color="white" mb16 />
        <AlertBox
          title="AlertBoxWithIconTitle"
          message="This is an alertBox"
          icon={['fas', 'info-circle']}
          mb16
          color="blue"
        />
        <AlertBox title="AlertBox" message="This is an alertBox" mb16 color="blue" />

        <Divider mv24 />

        <Text h2 mb16>
          Buttons
        </Text>
        <Text h3 mb8>
          Sizes
        </Text>
        <ButtonElement icon={['fas', 'random']} color="primary" onPress={() => {}} style={{ width: 48 }} mb8 />
        <ButtonElement title="Button label" color="primary" onPress={() => {}} mb8 />
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="primary" onPress={() => {}} mb8 />
        <ButtonElement title="Block button" color="primary" onPress={() => {}} style={{ width: '100%' }} mb8 />

        <Text h3 mb8 mt16>
          Variants
        </Text>
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="black" onPress={() => {}} mb8 />
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="gray200" onPress={() => {}} mb8 />
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="white" onPress={() => {}} mb8 />
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="primary" onPress={() => {}} mb8 />
        <ButtonElement title="Button w/ label + icon" icon={['fas', 'random']} color="blue" onPress={() => {}} mb8 />

        <Divider mv24 />

        <Text h2 mb16>
          Lists
        </Text>
        <Text h3 mb16>
          Simple list
        </Text>
        <ListItemElement title="Account" icon={['fas', 'random']} mb16 />
        <ListItemElement title="Updates" icon={['fas', 'random']} mb16 />
        <ListItemElement title="Password" icon={['fas', 'random']} mb16 />

        <Text h3 mb16>
          Simple list with subline
        </Text>
        <ListItemElement
          title="Account"
          icon={['fas', 'random']}
          rightIcon={['fas', 'chevron-down']}
          subTitle="Subline"
          mb16
        />
        <ListItemElement
          title="Updates"
          icon={['fas', 'random']}
          rightIcon={['fas', 'chevron-down']}
          subTitle="Subline"
          mb16
        />
        <ListItemElement
          title="Password"
          icon={['fas', 'random']}
          rightIcon={['fas', 'chevron-down']}
          subTitle="Subline"
          mb16
        />
        <Text h3 mb16>
          Link
        </Text>
        <ListItemElement title="Account" icon={['fas', 'random']} rightIcon={['fas', 'chevron-down']} mb16 />
        <ListItemElement title="Updates" icon={['fas', 'random']} rightIcon={['fas', 'chevron-down']} mb16 />
        <ListItemElement title="Password" icon={['fas', 'random']} rightIcon={['fas', 'chevron-down']} mb16 />

        {/* <Divider mv24 />

        <TopTabRouter /> */}

        <Divider mv24 />

        <ButtonElement
          title="Open bottom sheet"
          onPress={() => openBottomSheet(BottomSheet())}
          color="primary"
          style={{ width: '100%' }}
          mb8
        />
        <ButtonElement
          title="Open action bottom sheet"
          onPress={() =>
            openBottomSheet([
              {
                title: 'Add to Reserve List',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              {
                title: 'Download CV',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              {
                title: 'Delete Application',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              { index: 1, divider: true },
              {
                title: 'Share',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              {
                title: 'Report',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              {
                title: 'Add to Contacts',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              {
                title: 'Save in Bookmarks',
                icon: ['fas', 'random'],
                onPress: () => undefined
              },
              { index: 2, divider: true },
              {
                title: 'Do something dangerous',
                icon: ['fas', 'random'],
                color: 'primary',
                onPress: () => undefined
              }
            ])
          }
          color="primary"
          style={{ width: '100%' }}
          mb8
        />
        <ButtonElement
          onPress={() => navigation.navigate('StyleguidePageModal')}
          title="Open Modal"
          style={{ width: '100%' }}
        />
      </View>
    </PageWrapper>
  )
}

export default StyleguidePage
