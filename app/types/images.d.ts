declare module '*.svg' {
  import type { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}

declare module '*.png' {
  import type { ImageSourcePropType } from 'react-native'

  const content: ImageSourcePropType

  export default content
}

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native'

  const content: ImageSourcePropType

  export default content
}
