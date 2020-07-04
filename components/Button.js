import React from 'react';
import { themeColor } from '../utils/helper';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({ text, onPress, borderColor, backgroundColor, color, fontWeight, width }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, {
        width: width || 200,
        borderColor: borderColor || themeColor,
        backgroundColor: backgroundColor || themeColor,
      }]}
    >
      <Text style={[styles.buttonText, { color: color || "#fff", fontWeight }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 7,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
  }
});
