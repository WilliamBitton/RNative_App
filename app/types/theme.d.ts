/* eslint-disable @typescript-eslint/no-empty-interface */
import type {Spacings} from '../utils/styles';

declare module '@rneui/themed' {
  export interface ButtonProps extends Spacings {
    info?: boolean;
    rounded?: boolean;
  }

  export interface DividerProps extends Spacings {}

  export interface TextProps extends Spacings {
    color?: keyof Omit<Colors, 'platform'>;
    bold?: boolean;
  }

  export interface ComponentTheme {
    Button: Partial<ButtonProps>;
    Text: Partial<TextProps>;
    Divider: Partial<DividerProps>;
  }

  export interface Colors {
    shadow: string;
    green: string;
    darkGreen: string;
    blue: string;
    darkBlue: string;
    yellow: string;
    darkYellow: string;
    darkRed: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
    vote1: string;
    vote1Text: string;
    vote2: string;
    vote2Text: string;
    vote3: string;
    vote3Text: string;
    vote4: string;
    vote4Text: string;
    vote5: string;
    vote5Text: string;
    vote6: string;
    vote6Text: string;
    vote7: string;
    vote7Text: string;
    facebook: string;
    twitter: string;
    instagram: string;
    deezer: string;
    tiktok: string;
    weibo: string;
    appleMusic: string;
    bandcamp: string;
    spotify: string;
    soundcloud: string;
    youtube: string;
    vimeo: string;
  }
}
