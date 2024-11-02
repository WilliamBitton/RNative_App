import {makeStyles} from '@rneui/themed';
import type {ViewProps} from 'react-native';
import {View as RNView} from 'react-native';

import {type Spacings, flattenStyles, withSpacing} from '../utils/styles';

type Props = ViewProps & Spacings;

const useStyles = makeStyles((_theme, props: Props) => {
  const {style} = props;

  return {
    view: withSpacing(props, {
      ...(typeof style === 'object' && style != null
        ? flattenStyles(style)
        : {}),
    }),
  };
});

function View(props: Props) {
  const {style, children, ...otherProps} = props;

  const styles = useStyles(props);

  return (
    <RNView {...otherProps} style={styles.view}>
      {children}
    </RNView>
  );
}

export default View;
