import React from 'react';
import { View, StatusBar } from 'react-native';

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: StatusBar.currentHeight || 20 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default AppStatusBar;