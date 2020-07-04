import React from 'react';
import Heading from './Heading';
import { WIDTH } from '../utils/helper';
import { View, StyleSheet } from 'react-native';

const Message = ({ message }) => {
  return (
    <View style={styles.container}>
      <Heading heading={message} />
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WIDTH * 0.03,
  }
});
