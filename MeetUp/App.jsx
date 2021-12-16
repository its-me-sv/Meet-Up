import React from 'react';
import { ThemeProvider } from "styled-components/native";
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";

import store from "./src/redux/store";
import theme from "./src/infrastructure/theme/index";
import Navigation from './src/infrastructure/navigation/navigator.component';

const App = () => {
  const [HunderedMiraclesPlain] = useFonts({
    HunderedMiraclesPlain: require("./assets/fonts/HundredMiraclesPERSONALUSE-Plain.otf")
  });
  const [HunderedMiraclesRegular] = useFonts({
    HunderedMiraclesRegular: require("./assets/fonts/HundredMiraclesPERSONALUSE-Regular.otf")
  });
  const [KnewaveRegular] = useFonts({
    KnewaveRegular: require("./assets/fonts/Knewave-Regular.ttf")
  });
  const [PermanentMarkerRegular] = useFonts({
    PermanentMarkerRegular: require("./assets/fonts/PermanentMarker-Regular.ttf")
  });
  const [YelloTailRegular] = useFonts({
    YelloTailRegular: require("./assets/fonts/Yellowtail-Regular.ttf")
  });
  if (!HunderedMiraclesPlain || !HunderedMiraclesRegular || !KnewaveRegular)
    return null;
  if (!PermanentMarkerRegular || !YelloTailRegular)
    return null;
  
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

export default App;