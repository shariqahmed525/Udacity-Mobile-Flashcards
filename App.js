import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import store from './store';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import AppStatusBar from './components/AppStatusBar';
import { themeColor, setLocalNotification } from './utils/helper';

const App = () => {

  useEffect(() => {
    setLocalNotification();
  }, [])

  return (
    <Provider store={store}>
      <AppStatusBar backgroundColor={themeColor} barStyle="light-content" />
      <Navigation />
    </Provider>
  );
}

export default App;