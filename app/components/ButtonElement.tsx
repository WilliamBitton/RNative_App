import type {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button, Text, makeStyles, useTheme} from '@rneui/themed';
import type {Colors} from '@rneui/themed';
import {type StyleProp, type ViewStyle} from 'react-native';

import {fonts, whiteTextBackgrounds} from '../utils/constants';
import type {Spacings} from '../utils/styles';
import {flattenStyles, withSpacing} from '../utils/styles';
import TouchableOpacity from './TouchableOpacity';
import View from './View';

type Props = Spacings & {
  title?: string;
  onPress?: () => void;
  color?: keyof Omit<Colors, 'platform'>;
  icon?: IconProp;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  link?: boolean;
  disabled?: boolean;
};

const useStyles = makeStyles((theme, props: Props) => {
  const {style, color} = props;
  return {
    container: withSpacing(props, {
      borderRadius: 6,
      height: 48,
      alignSelf: 'flex-start',
      backgroundColor: theme.colors[color ?? 'primary'],
      ...(typeof style === 'object' && style != null
        ? flattenStyles(style)
        : {}),
    }),
    linkContainer: withSpacing(props, {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      ...(typeof style === 'object' && style != null
        ? flattenStyles(style)
        : {}),
    }),
    buttonText: {
      fontSize: 16,
      fontFamily: fonts.bold,
      lineHeight: 21,
      color: whiteTextBackgrounds.includes(color ?? 'primary')
        ? theme.colors.white
        : theme.colors.black,
    },
    link: {
      fontSize: 16,
      lineHeight: 16,
    },
  };
});

function ButtonElement(props: Props): React.JSX.Element {
  const {icon, onPress, title, iconSize, link, color, disabled} = props;
  const styles = useStyles(props);
  const {theme} = useTheme();

  if (link) {
    return (
      <TouchableOpacity style={styles.linkContainer} pv8>
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size={iconSize ?? 16}
            color={color ? theme.colors[color] : theme.colors.black}
          />
        )}
        <Text
          bold
          style={styles.link}
          color={color ?? 'black'}
          ml16={Boolean(icon)}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <Button
      disabled={disabled}
      onPress={onPress}
      buttonStyle={styles.container}
      titleStyle={styles.buttonText}
      ph16={Boolean(title)}>
      {icon && (
        <View mr16={Boolean(title)}>
          <FontAwesomeIcon
            icon={icon}
            size={iconSize ?? 16}
            color={
              whiteTextBackgrounds.includes(color ?? 'primary')
                ? theme.colors.white
                : theme.colors.black
            }
          />
        </View>
      )}
      {title && title}
    </Button>
  );
}

export default ButtonElement;
