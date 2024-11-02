import type {TextProps} from '@rneui/themed';
import {createTheme} from '@rneui/themed';
import type {TextStyle} from 'react-native';

import {fonts} from './constants';
import {withSpacing} from './styles';

export default createTheme({
  lightColors: {
    // system
    primary: '#F53E4A',
    secondary: '#CA71EB',
    background: '#FFFFFF',
    white: '#FFFFFF',
    black: '#151313',
    grey0: '#474747',
    grey1: '#7C7979',
    grey2: '#9B9797',
    grey3: '#AFACAC',
    grey4: '#CDCBCB',
    grey5: '#EBEAEA',
    greyOutline: '#BBBBBB',
    searchBg: '#303337',
    success: '#52C41A',
    error: '#FF190C',
    warning: '#FAAD14',
    disabled: 'hsl(208, 8%, 90%)',

    // custom
    shadow: '#151313',
    green: '#3CE8C8',
    darkGreen: '#094F43',
    blue: '#2E8ED8',
    darkBlue: '#113B5D',
    yellow: '#FEC336',
    darkYellow: '#4F3700',
    darkRed: '#920811',
    gray100: '#F9F8F8',
    gray200: '#EBEAEA',
    gray300: '#CDCBCB',
    gray400: '#AFACAC',
    gray500: '#9B9797',
    gray600: '#7C7979',
    gray700: '#676565',
    gray800: '#474747',
    gray900: '#2C2B2B',

    // Votes
    vote1: '#5EC789',
    vote1Text: '#174229',
    vote2: '#AFD468',
    vote2Text: '#425719',
    vote3: '#EDDD64',
    vote3Text: '#776B0E',
    vote4: '#FEC336',
    vote4Text: '#674901',
    vote5: '#FD8D33',
    vote5Text: '#4A2101',
    vote6: '#FC573D',
    vote6Text: '#520C01',
    vote7: '#C4003C',
    vote7Text: '#151313',

    // Brand colors
    facebook: '#3B5998',
    twitter: '#1DA1F2',
    instagram: '#405DE6',
    deezer: '#FF0000',
    tiktok: '#FE2C55',
    weibo: '#FF9406',
    appleMusic: '#151313',
    bandcamp: '#629AA9',
    spotify: '#1DB954',
    soundcloud: '#FF8800',
    youtube: '#FF0000',
    vimeo: '#1AB7EA',
  },
  mode: 'light',
  components: {
    Button: (props, theme) => ({
      titleStyle: {
        ...(props.info ? {color: theme.colors.black} : {}),
      },
      buttonStyle: withSpacing(props, {
        ...(props.info ? {backgroundColor: theme.colors.white} : {}),
        ...(props.rounded ? {borderRadius: 30} : {}),
      }),
    }),
    Divider: (props, theme) => ({
      style: withSpacing(props, {}),
      backgroundColor: theme.colors.gray200,
      height: 1,
    }),
    Text: (props, theme) => ({
      h1Style: {
        fontSize: 30,
        fontFamily: fonts.bold,
        fontWeight: 'normal',
        lineHeight: 32,
        letterSpacing: -0.3,
        color: props.color ? theme.colors[props.color] : theme.colors.black,
      },
      h2Style: {
        fontSize: 24,
        fontFamily: fonts.bold,
        fontWeight: 'normal',
        lineHeight: 27,
        letterSpacing: -0.3,
        color: props.color ? theme.colors[props.color] : theme.colors.black,
      },
      h3Style: {
        fontSize: 18,
        fontFamily: fonts.bold,
        fontWeight: 'normal',
        lineHeight: 21,
        color: props.color ? theme.colors[props.color] : theme.colors.black,
      },
      h4Style: {
        fontSize: 16,
        fontFamily: fonts.bold,
        fontWeight: 'normal',
        lineHeight: 17,
        color: props.color ? theme.colors[props.color] : theme.colors.black,
      },
      style: withSpacing<TextStyle, TextProps>(props, {
        fontSize: 14,
        fontFamily: props.bold ? fonts.bold : fonts.regular,
        fontWeight: 'normal',
        lineHeight: 20,
        color: props.color ? theme.colors[props.color] : theme.colors.gray800,
      }),
    }),
  },
});
