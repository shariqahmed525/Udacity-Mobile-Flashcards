import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { WIDTH } from '../utils/helper';

const Input = props => {
  const {
    value,
    placeholder,
    onChangeText,
    onSubmitEditing
  } = props;

  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

export default Input;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: WIDTH - (WIDTH / 10),
  }
});
