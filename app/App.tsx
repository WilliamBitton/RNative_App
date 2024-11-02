import {useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from '@rneui/themed';
import theme from './utils/theme';
import Router from './router';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BottomSheetProvider} from './contexts/bottomSheetContext';
import {ScrollingTitleProvider} from './contexts/scrollingTitleContext';
import './utils/fontawesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {LightBoxProvider} from './contexts/lightBoxContext';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <GestureHandlerRootView>
          <LightBoxProvider>
            <BottomSheetProvider>
              <ScrollingTitleProvider>
                <Router />
              </ScrollingTitleProvider>
            </BottomSheetProvider>
          </LightBoxProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
