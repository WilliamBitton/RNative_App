import type { Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import InputField from '../../../components/InputField'
import { type Inputs } from './_types'

type Props = {
  control: Control<Inputs>
}

function Email(props: Props) {
  const { control } = props

  return (
    <Controller
      control={control}
      rules={{
        required: true
      }}
      render={({ field: { onChange, onBlur }, formState: { errors } }): React.JSX.Element => (
        <InputField
          mb0
          errorMessage={errors.email && 'This field is required'}
          label={'Email'}
          placeholder=""
          backgroundColor="white"
          onBlur={onBlur}
          onChangeText={onChange}
          textColor="black"
        />
      )}
      name="email"
    />
  )
}

export default Email
