import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Button, Text, makeStyles, useTheme} from '@rneui/themed';
import type {StyleProp, ViewStyle} from 'react-native';

import {fonts} from '../utils/constants';
import type {Spacings} from '../utils/styles';
import {flattenStyles, withSpacing} from '../utils/styles';
import View from './View';

type Props = Spacings & {
  buttonText: string;
  style?: StyleProp<ViewStyle>;
};

const useStyles = makeStyles((theme, props: Props) => {
  const {style} = props;

  return {
    view: withSpacing(props, {
      backgroundColor: theme.colors.white,
      shadowColor: theme.colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1.5,
      },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
      borderRadius: 6,
      ...(typeof style === 'object' && style != null
        ? flattenStyles(style)
        : {}),
    }),
    button: {
      backgroundColor: theme.colors.white,
      borderRadius: 6,
      width: '100%',
      height: 72,
    },
    title: {
      color: theme.colors.black,
      fontSize: 16,
      fontFamily: fonts.bold,
      lineHeight: 17,
      marginVertical: 0,
    },
    subTitle: {
      color: theme.colors.gray600,
      fontSize: 14,
      fontFamily: fonts.regular,
      lineHeight: 17,
      marginVertical: 0,
    },
    textContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 15,
      flexGrow: 1,
    },
    container: {
      alignItems: 'flex-start',
      display: 'flex',
    },
    iconContainer: {
      backgroundColor: theme.colors.black,
      padding: 14,
      borderRadius: 50,
      marginLeft: 6,
    },
  };
});

function MediaBox(props: Props): React.JSX.Element {
  const {buttonText} = props;
  const {theme} = useTheme();
  const styles = useStyles(props);
  const handleDownload = () => {};

  return (
    <View style={styles.view}>
      <Button
        onPress={handleDownload}
        buttonStyle={styles.button}
        containerStyle={styles.container}>
        <View style={styles.iconContainer}>
          <FontAwesomeIcon
            icon={['fas', 'file']}
            size={16}
            color={theme.colors.white}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{buttonText}</Text>
          <Text style={styles.subTitle}>{'Subtitles'} (8kb)</Text>
        </View>
      </Button>
    </View>
  );
}

export default MediaBox;
